export default defineNuxtRouteMiddleware((to) => {
    const { authenticated, loading } = useAuth()

    // If still loading, wait before redirecting
    if (loading.value) {
        return
    }

    // If user is not authenticated and trying to access a protected route
    if (!authenticated.value && to.path !== '/login') {
        return navigateTo('/login')
    }

    // If user is authenticated and trying to access login page
    if (authenticated.value && to.path === '/login') {
        return navigateTo('/projects/active')
    }
})
