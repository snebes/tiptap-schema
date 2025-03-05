export default defineNuxtPlugin(async () => {
    const { checkAuth } = useAuth()

    // Check authentication status when app starts
    await checkAuth()
})
