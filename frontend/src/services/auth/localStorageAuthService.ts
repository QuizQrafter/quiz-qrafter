import type { AuthService, LoginCredentials, SignUpInfo, User } from "./types"

/**
 * for testing and development ONLY
 */
export class LocalStorageAuthService implements AuthService {
  async currentUser(): Promise<User | null> {
    const key = localStorage.getItem("currentUser")
    if (key === null) return null
    const value = localStorage.getItem(key)
    if (value === null) return null
    return JSON.parse(value) as User
  }

  async signUp(info: SignUpInfo): Promise<void> {
    const key = this.makeKey(info.email, info.password)
    const user: User = {
      email: info.email,
      username: info.fullname,
    }
    const value = JSON.stringify(user)
    localStorage.setItem(key, value)
  }

  async login(credentials: LoginCredentials): Promise<User> {
    const key = this.makeKey(credentials.email, credentials.password)
    const value = localStorage.getItem(key)
    if (value === null) throw new Error("Invalid email and password")

    localStorage.setItem("currentUser", key)

    return JSON.parse(value) as User
  }

  async signOut(): Promise<void> {
    localStorage.removeItem("currentUser")
  }

  private makeKey(email: string, password: string): string {
    return `${email}:${password}`
  }
}
