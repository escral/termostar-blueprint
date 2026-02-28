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
- AssemblySpec (discriminated union by `type`)

Specs are the only objects mutated by UI.

Example conceptual shape:

```ts
type AssemblySpec =
  | { id: string; type: "Hydroarrow"; params: {...} }
  | { id: string; type: "MainJoin"; params: {...} }
```

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
    - Grid/row layout
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
