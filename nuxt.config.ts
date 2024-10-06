// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,
    },

    ssr: false,

    modules: [
        '@nuxtjs/google-fonts',
        '@nuxtjs/tailwindcss',
    ],

    googleFonts: {
        families: {
            Raleway: [300, 400, 500, 600, 700],
        },
    },

    css: [
        '~/assets/styles/index.pcss',
    ],

    postcss: {
        plugins: {
            'tailwindcss/nesting': {},
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
