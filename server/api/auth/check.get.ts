import { defineEventHandler } from 'h3'
import { getAuthToken, validateToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    const token = getAuthToken(event)

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'No token found'
        })
    }

    const isValid = await validateToken(token)

    if (!isValid) {
        throw createError({
            statusCode: 401,
            message: 'Invalid token'
        })
    }

    return {
        authenticated: true
    }
})
