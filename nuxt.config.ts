// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    runtimeConfig: {
        // Private keys that are exposed to the server
        apiSecret: '',
        // Public keys that are exposed to the client
        public: {
            apiBase: process.env.NUXT_API_BASE || 'https://correlation-api-dev.iccsafe.org'
        }
    }
})
