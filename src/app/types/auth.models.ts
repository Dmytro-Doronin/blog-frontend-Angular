export type AuthLogin = {
  loginOrEmail: string
  password: string
}

export type ConfirmationEmailTypes = 'error' | 'success' | 'pending' | null

export interface AuthRegistration {
  login: string
  password: string
  email: string
}

export interface AuthMe {
  email: string
  login: string
  userId: string
  deviceId: string
  imageUrl: string
}
