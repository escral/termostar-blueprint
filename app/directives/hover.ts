import type { Directive } from 'vue'

const hoverMap: { [key: string]: HTMLElement[] } = {}

export default {
    mounted(el: HTMLElement, binding: { value: string | string[] }) {
        const ids = ensureArray(binding.value)

        for (const id of ids) {
            hoverMap[id] ||= []
            hoverMap[id].push(el)
        }

        el.classList.add('--hoverable')

        // @todo If parent has hoverable, then we should not trigger event on it, only on child

        el.addEventListener('mouseenter', () => {
            for (const id of ids) {
                for (const el of hoverMap[id]!) {
                    el.classList.add('--hover')
                }
            }
        })

        el.addEventListener('mouseleave', () => {
            for (const id of ids) {
                for (const el of hoverMap[id]!) {
                    el.classList.remove('--hover')
                }
            }
        })
    },
} satisfies Directive
