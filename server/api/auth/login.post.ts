import { defineEventHandler, readBody, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        const body = await readBody(event)

        // Call external API
        const response = await $fetch(`${config.public.apiBase}/api/login_check`, {
            method: 'POST',
            body: {
                email: body.username,
                password: body.password
            }
        })

        // Assuming the external API returns a token
        const { token } = response

        // Set token in HTTP-only cookie
        setCookie(event, 'auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
        })

        return {
            success: true
        }
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: 'Invalid credentials'
        })
    }
})
