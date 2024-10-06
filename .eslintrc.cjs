module.exports = {
    root: true,

    env: {
        node: true,
    },

    rules: {
        // Project specific rules
        "vue/require-typed-object-prop": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        '@typescript-eslint/consistent-type-imports': 'error',
        "space-infix-ops": ["error"],
        "@typescript-eslint/type-annotation-spacing": "error",
        "vue/component-name-in-template-casing": ["error", "PascalCase", { registeredComponentsOnly: false }],
    },

    extends: [
        "@escral/eslint-config-vue-typescript",
    ],
}
