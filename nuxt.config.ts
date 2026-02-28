export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

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
        '~/assets/css/index.pcss',
    ],

    // postcss: {
    //     plugins: {
    //         'tailwindcss/nesting': {},
    //         tailwindcss: {},
    //         autoprefixer: {},
    //     },
    // },
})
