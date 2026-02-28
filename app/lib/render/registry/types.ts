import type { DefineComponent } from 'vue'
import type { PartType } from '~/lib/render-model/contracts'

export type PartRendererComponent = DefineComponent<Record<string, unknown>>

export type PartRendererEntry<TPartType extends PartType = PartType> = {
    partType: TPartType
    component: PartRendererComponent
}
