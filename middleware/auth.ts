export default defineNuxtRouteMiddleware((to) => {
    const { authenticated } = useAuth()

    // If user is not authenticated and trying to access a protected route
    if (!authenticated.value && to.path !== '/login') {
        return navigateTo('/login')
    }

    // If user is authenticated and trying to access login page
    if (authenticated.value && to.path === '/login') {
        return navigateTo('/')
    }
})
