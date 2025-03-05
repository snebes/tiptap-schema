import { H3Event } from 'h3'

export function getAuthToken(event: H3Event): string | null {
    const cookie = getCookie(event, 'auth_token')
    if (!cookie) return null
    return cookie
}

export async function validateToken(token: string): Promise<boolean> {
    try {
        // Add your token validation logic here
        return true
    } catch {
        return false
    }
}
