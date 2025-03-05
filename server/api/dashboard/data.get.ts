import { defineEventHandler } from 'h3'
import { getAuthToken, validateToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = getAuthToken(event)

    if (!token || !(await validateToken(token))) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    try {
        // Call external API with token
        const data = await $fetch(`${config.public.apiBase}/api/v2/projects`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch dashboard data'
        })
    }
})
