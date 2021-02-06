export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

export interface AuthState {
  token: string;
  user: User;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextState {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}
