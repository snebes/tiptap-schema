<template>
    <div class="min-h-screen bg-gray-100">
        <div class="py-10">
            <header>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold leading-tight text-gray-900">
                        Dashboard
                    </h1>
                </div>
            </header>
            <main>
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="px-4 py-8 sm:px-0">
                        <div v-if="loading">Loading...</div>
                        <div v-else-if="error">{{ error }}</div>
                        <div v-else class="border-4 border-dashed border-gray-200 rounded-lg p-4">
                            <pre>{{ JSON.stringify(dashboardData, null, 2) }}</pre>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
const { authenticated, loading } = useAuth()
const router = useRouter()

const dashboardLoading = ref(true)
const error = ref(null)
const dashboardData = ref(null)

// Add cookie check
const cookieExists = useCookie('auth_token')
console.log('Auth cookie exists:', !!cookieExists.value)

onMounted(async () => {
    if (!authenticated.value) {
        console.log('Not authenticated, redirecting to login')
        return router.push('/login')
    }

    try {
        const data = await $fetch('/api/dashboard/data')
        dashboardData.value = data
    } catch (e) {
        error.value = 'Failed to load dashboard data'
        console.error('Dashboard error:', e)
    } finally {
        dashboardLoading.value = false
    }
})
</script>
