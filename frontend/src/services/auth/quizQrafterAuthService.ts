import { AuthService, LoginCredentials, SignUpInfo, User } from "./types";

export class QuizQrafterAuthService implements AuthService {
  constructor(private readonly baseURL: URL) {}

  async currentUser(): Promise<User | null> {
    const response = await fetch(new URL("/api/v1/auth/info", this.baseURL), {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) return null;
    const { email, fullname } = await response.json();
    return {
      email: email,
      username: fullname,
    };
  }

  async signUp(info: SignUpInfo): Promise<void> {
    await fetch(new URL("/api/v1/auth/signup", this.baseURL), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password,
        fullname: info.fullname,
      }),
    });
  }

  async signIn(credentials: LoginCredentials): Promise<User> {
    const response = await fetch(new URL("/api/v1/auth/login", this.baseURL), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const { email, fullname } = await response.json();
    return {
      email: email,
      username: fullname,
    };
  }

  async signOut(): Promise<void> {
    await fetch(new URL("/api/v1/auth/logout", this.baseURL), {
      method: "POST",
      credentials: "include",
    });
  }
}
