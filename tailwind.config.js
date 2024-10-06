// noinspection NpmUsedModulesInstalled

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{vue,ts}',
        './composables/**/*.{vue,ts}',
        './modals/**/*.{vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.ts',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FF6B6B',
                },
            }
        },
        container: {
            center: true,
        },
    },
}
