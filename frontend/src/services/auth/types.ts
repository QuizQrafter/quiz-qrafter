export interface AuthService {
  currentUser(): Promise<User | null>;
  signUp(info: SignUpInfo): Promise<void>;
  login(credentials: LoginCredentials): Promise<User>;
  signOut(): Promise<void>;
}

export type User = {
  email: string;
  username: string;
};

export type SignUpInfo = {
  email: string;
  password: string;
  fullname: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};
