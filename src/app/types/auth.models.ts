export type AuthLogin = {
  loginOrEmail: string
  password: string
}

export interface AuthRegistration {
  login: string
  password: string
  email: string
}

export interface AuthMe {
  email: string
  login: string
  userId: string
}
