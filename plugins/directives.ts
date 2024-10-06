import hover from '~/directives/hover'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('hover', hover)
})