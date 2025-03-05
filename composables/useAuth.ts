export const useAuth = () => {
    const authenticated = useState('authenticated', () => false)
    const loading = useState('authLoading', () => false)
    const error = useState('authError', () => null)

    const login = async (username: string, password: string) => {
        loading.value = true
        error.value = null

        try {
            await $fetch('/api/auth/login', {
                method: 'POST',
                body: { username, password }
            })
            authenticated.value = true
            return true
        } catch (e) {
            error.value = 'Invalid credentials'
            return false
        } finally {
            loading.value = false
        }
    }

    const logout = async () => {
        await $fetch('/api/auth/logout', { method: 'POST' })
        authenticated.value = false
    }

    return {
        authenticated,
        loading,
        error,
        login,
        logout
    }
}
