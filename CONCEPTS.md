# Blueprint Generator — Concepts

This document defines the core architecture and data flow for the blueprint generator.

Goals:

- Separate **domain** (pure TypeScript) from **render/UI** (Vue + SVG).
- Keep **assemblies editable** and **parts physical**.
- Render **top-down only (2D)**.
- Export **final SVG** as the durable reference artifact.

---

## 1. Layers

### Domain Layer (TypeScript)

Pure data + pure functions. No Vue. No SVG.

Responsibilities:

- Define part types (geometry, ports, measures).
- Define assembly specs (editable configuration).
- Resolve specs into concrete part instances + placement plan.
- Compute materials/BOM.

### Render Layer (Vue)

Renders **resolved parts only**.

Responsibilities:

- Display SVG for parts.
- Handle interaction (selection, hover).
- Provide UI forms to edit specs.
- Export SVG.

---

## 2. Core Concepts

Hierarchy:

```
BlueprintSpec
  └── ProductSpec (one active in Constructor)
        └── AssemblySpec (config only)
              └── resolve() → PartInstance[]
                     + PlacementPlan (2D transforms)
```

### AssemblySpec

- Editable configuration.
- Contains type + parameters.
- No geometry.
- No rendering logic.

### PartDefinition

- Physical template definition.
- Defines ports (anchors).
- Defines measure functions (area, volume, etc.).
- Defines renderer key.

### PartInstance

- Concrete resolved part.
- Has `id`, `params`, `tags`.
- References a PartDefinition.

### Renderer

- Renders PartInstances only.
- Assemblies are never rendered directly.

---

## 3. Data Flow Pipeline

Explicit pipeline:

1. **Spec** (editable)
2. **Resolved** (deterministic, testable)
3. **RenderModel** (UI-friendly)

### 3.1 Spec

Editable domain objects:

- BlueprintSpec
- ProductSpec
- AssemblySpec (typed via **type → params map**, not a large union)

Specs are the only objects mutated by UI.

#### AssemblySpec (Option A: Type → Params Map)

Instead of a discriminated union, we model assemblies using:
- a finite set of `AssemblyType` strings
- a `AssemblyParamsByType` mapping
- a generic `AssemblySpec<T>`

Conceptual shape:

```ts
type AssemblyType = "Hydroarrow" | "MainJoin"

type AssemblyParamsByType = {
  Hydroarrow: { /* ... */ }
  MainJoin: { /* ... */ }
}

type AssemblySpec<T extends AssemblyType = AssemblyType> = {
  id: string
  type: T
  params: AssemblyParamsByType[T]
}
```

This keeps specs as plain serializable objects, avoids a growing union definition,
and still provides strong typing for params per assembly type.

---

### 3.2 Resolve

Function:

```
resolveBlueprint(spec: BlueprintSpec): ResolvedBlueprint
```

Output:

- Concrete PartInstance[]
- 2D placement transforms
- Optional warnings / metadata

Resolvers must be pure functions.

---

### 3.3 RenderModel

Function:

```
toRenderModel(resolved: ResolvedBlueprint): RenderNode[]
```

Each RenderNode:

- `id`
- `partType`
- `params`
- `transform2d` (x, y, rotation)
- `styleTags?`
- `ports?`

Vue renders a list of RenderNodes.

---

## 4. Top-Down Placement Strategy (2D Only)

We do not implement a constraint solver.

Instead:

- Assemblies compute placement deterministically.
- Use simple layout strategies:
    - Chain placement (A → B → C)
    - Offset from anchor
    - Rotation alignment

---

### 4.1 Ports / Anchors

Each PartDefinition exposes named ports in 2D:

Examples:

- inletCenter
- outletCenter
- boltCircleCenter

Ports are local coordinates relative to part origin.

Assemblies use ports to compute transforms:

- Coincide two ports
- Align axis
- Apply offset
- Apply rotation

No general solver — just deterministic math.

## 4.2 SVG Grouping (Layers)

The SVG output should be organized into explicit `<g>` layers. This improves:

- Debuggability (inspect/show/hide layers in devtools)
- Performance (update only affected layers)
- Feature toggles (e.g. “show dimensions”)
- Export control (blueprint-only vs blueprint + annotations)

Recommended top-level structure:

```svg

<svg>
    <g id="layer-geometry">...</g>        <!-- main part outlines -->
    <g id="layer-dimensions">...</g>      <!-- dimension lines, arrows -->
    <g id="layer-labels">...</g>          <!-- text labels, port captions -->
    <g id="layer-debug">...</g>           <!-- optional: ports, anchors, bbox -->
</svg>
```

### Layer Rules

- Each RenderNode should declare a `layer`.
- The renderer routes nodes into the correct `<g>`.
- Styling should be centralized per-layer (e.g. dimension stroke style).
- UI controls must not live inside SVG (`foreignObject` is discouraged).
- HTML UI should be rendered in a separate overlay layer.

Example RenderNode extension:

```ts
type RenderNode = {
    id: string
    partType: string
    params: unknown
    transform2d: {
        x: number;
        y: number;
        rotation: number
    }
    layer?: "geometry" | "insulation" | "dimensions" | "labels" | "debug"
    hoverGroup?: string
}
```

## 4.3 Interaction Groups (Hover Linking)

UI controls and blueprint elements may belong to the same **interaction group**.

This enables symmetric highlighting:

- Hovering a UI control highlights related blueprint elements.
- Hovering a blueprint element highlights related UI controls.

### Concept

Each renderable entity may declare:

```ts
type RenderNode = {
    // ... other props
    hoverGroup?: string
}
```

UI controls may also declare:

```ts
type UiControl = {
    // ... other props
    hoverGroup?: string
}
```

A single central state controls interaction:

```ts
const interactionState = reactive({
    hoveredGroup: null as string | null
})
```

Highlighting rule:

- If `node.hoverGroup === hoveredGroup` → apply highlight style.
- If `control.hoverGroup === hoveredGroup` → apply highlight style.

### Rules

- Hover is state-driven, not DOM-driven.
- No direct element scanning or mutation.
- SVG and HTML layers remain decoupled.
- Groups are semantic (e.g. `"contour-3"`, `"left-inlet"`), not visual.

This pattern allows future extensions:

- `selectedGroup`
- `editingGroup`
- `warningGroup`

---

## 5. Materials / BOM

### 5.1 Measures

PartDefinitions provide measures:

- area2d
- surfaceArea (optional)
- volume (optional)
- length (optional)
- weight (optional)

Measures are structured data, not just raw numbers.

---

### 5.2 BOM Computation

Pipeline:

- Part BOM = function(partType, params, measures)
- Assembly BOM = sum of part BOMs
- Product BOM = sum of assembly BOMs

Function:

```
computeBOM(resolved: ResolvedBlueprint): BomLine[]
```

BOM logic is separate from rendering and placement.

---

## 6. Identity Rules

Stable IDs are required for:

- Selection
- Highlighting
- Caching
- SVG element consistency

Rules:

- Every AssemblySpec has an `id`.
- PartInstance IDs derive from assembly ID:

Example:

```
"${assemblyId}:${localPartKey}"
```

---

## 7. Persistence Strategy

We do not support versioned long-term spec compatibility.

Canonical artifact:

- Exported SVG.

If future versions break spec compatibility:

- Previously exported SVG remains reference output.

Spec persistence is best-effort within current app version only.

---

## 8. Module Boundaries

Domain must not:

- Import Vue
- Use reactive state
- Access rendering code

Render layer must not:

- Implement domain logic
- Decide part types
- Compute placement

Assemblies influence placement, not rendering.

---

## 9. Suggested Folder Structure

```
src/
  domain/
    specs/
    parts/
    resolvers/
    bom/
    render-model/
  render/
    parts-svg/
    editor/
  features/
    constructor/
      ui/
      state/
```

---

## 10. Design Rules

1. Assemblies are configuration only.
2. Resolution is explicit (Spec → Resolved → RenderModel).
3. Only parts are rendered.
4. Top-down 2D only.
5. SVG is the canonical output artifact.
