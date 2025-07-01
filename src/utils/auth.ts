import Cookie from 'js-cookie'

const tokenKey = 'Cookie'

export function getToken(): string {
  return Cookie.get(tokenKey)
}

export function removeToken(): void {
  Cookie.remove(tokenKey)
}

export function setToken(token: string): void {
  Cookie.set(tokenKey, token)
}
