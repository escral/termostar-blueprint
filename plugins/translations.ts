export default defineNuxtPlugin(() => {
    return {
        provide: {
            t: (phrase: string) => phrase, // @todo
        },
    }
})
