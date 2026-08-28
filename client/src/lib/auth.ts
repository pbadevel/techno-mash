// /home/pbadev/projects/tmnpo/brief/client/src/lib/auth.ts

const KEY = 'tmnpo:auth:v1'
export type Role = 'guest' | 'editor' | 'admin'

export const auth = {
  getRole(): Role {
    // Если код выполняется на сервере (Node.js/Bun), localStorage недоступен
    if (typeof window === 'undefined') {
      return 'guest'
    }
    return (localStorage.getItem(KEY) as Role) || 'guest'
  },
  login(role: Role = 'admin') {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEY, role)
    }
  },
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(KEY)
    }
  },
}
