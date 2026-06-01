import axios, { AxiosError } from 'axios'
import type {
  FooResponse,
  LocaleResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  MessageResponse,
  ValidationErrors,
} from '../types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1'

export class ApiError extends Error {
  status: number
  errors?: ValidationErrors

  constructor(message: string, status: number, errors?: ValidationErrors) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

type ErrorPayload = {
  message?: string
  errors?: ValidationErrors
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorPayload>) => {
    if (error.response) {
      throw new ApiError(
        error.response.data?.message ?? `API request failed with ${error.response.status}`,
        error.response.status,
        error.response.data?.errors,
      )
    }

    throw new ApiError(error.message, 0)
  },
)

function authHeader(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export async function getFoo() {
  const response = await api.get<FooResponse>('/foo')

  return response.data
}

export async function getLocale(locale = 'en') {
  const response = await api.get<LocaleResponse>('/locale', {
    params: { locale },
  })

  return response.data
}

export async function login(email: string, password: string) {
  const response = await api.post<LoginResponse>('/auth/login', {
    email,
    password,
    device_name: 'react-template',
  } satisfies LoginRequest)

  return response.data
}

export async function getMe(token: string) {
  const response = await api.get<MeResponse>('/auth/me', authHeader(token))

  return response.data
}

export async function logout(token: string) {
  const response = await api.post<MessageResponse>('/auth/logout', undefined, authHeader(token))

  return response.data
}

export async function getAdminFoo(token: string) {
  const response = await api.get<FooResponse>('/admin/foo', authHeader(token))

  return response.data
}

export async function dispatchDemoJob(token: string) {
  const response = await api.post<MessageResponse>(
    '/jobs/demo',
    { message: 'Queued from React template' },
    authHeader(token),
  )

  return response.data
}

export async function broadcastDemo(token: string) {
  const response = await api.post<MessageResponse>(
    '/broadcast/demo',
    { message: 'Broadcast from React template' },
    authHeader(token),
  )

  return response.data
}
