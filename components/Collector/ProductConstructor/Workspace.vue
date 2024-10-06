<template>
    <div class="workspace">
        <div class="workspace__part workspace__part--arrow-left workspace__part--align-center cursor-pointer"
             @mouseenter="scrollLeft"
             @mouseleave="stopScroll">
            <div>
                <i class="header__contact__icon icon icon--scroll-left"></i>
            </div>
        </div>
        <div class="workspace__part">
            <slot name="config"></slot>
        </div>
        <div class="workspace__part workspace__part--scrollable" ref="workspace">
            <div v-if="order" style="font-weight: bold; font-size: 20px">{{ __('Изделие из заказа #:n', {n: order}) }}</div>

            <slot name="element"></slot>
        </div>
        <div class="workspace__part workspace__part--arrow-right workspace__part--align-center cursor-pointer"
             @mouseenter="scrollRight"
             @mouseleave="stopScroll">
            <div>
                <i class="header__contact__icon icon icon--scroll-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import ScrollsWorkspace from "~mixins/special-order/ScrollsWorkspace"

export default {
    mixins: [
        ScrollsWorkspace,
    ],

    props: {
        order: {},
    },
}
</script>
