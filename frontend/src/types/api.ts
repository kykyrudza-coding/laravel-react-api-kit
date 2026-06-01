export type ApiUser = {
  id: number
  name: string
  email: string
  roles: string[]
  permissions: string[]
}

export type FooResponse = {
  foo: string
  message: string
}

export type LoginRequest = {
  email: string
  password: string
  device_name?: string
}

export type LoginResponse = {
  token: string
  user: ApiUser
}

export type MeResponse = {
  user: ApiUser
}

export type MessageResponse = {
  message: string
}

export type LocaleResponse = {
  locale: string
  messages: {
    welcome: string
    advanced: string
  }
}

export type ValidationErrors = Record<string, string[]>
