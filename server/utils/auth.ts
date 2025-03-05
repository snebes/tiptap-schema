import { H3Event } from 'h3'

export function getAuthToken(event: H3Event): string | null {
    // Add logging to debug cookie reading
    const cookie = getCookie(event, 'auth_token')
    console.log('Reading auth token from cookie:', cookie ? 'Found' : 'Not found')
    return cookie
}

export async function validateToken(token: string): Promise<boolean> {
    try {
        // Add your token validation logic here
        // For now, just check if token exists
        return !!token
    } catch {
        return false
    }
}
