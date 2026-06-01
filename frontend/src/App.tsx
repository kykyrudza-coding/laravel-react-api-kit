import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ApiError,
  broadcastDemo,
  dispatchDemoJob,
  getAdminFoo,
  getFoo,
  getLocale,
  getMe,
  login,
  logout,
} from './lib/api'
import type { ApiUser, FooResponse } from './types/api'
import './App.css'

function errorMessage(error: unknown) {
  if (error instanceof ApiError) {
    const firstValidationMessage = Object.values(error.errors ?? {})[0]?.[0]

    return firstValidationMessage ?? error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected API error.'
}

function App() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<ApiUser | null>(null)
  const [adminFoo, setAdminFoo] = useState<FooResponse | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const fooQuery = useQuery({
    queryKey: ['foo'],
    queryFn: getFoo,
  })

  const localeQuery = useQuery({
    queryKey: ['locale', i18n.language],
    queryFn: () => getLocale(i18n.language),
  })

  const loginMutation = useMutation({
    mutationFn: () => login('admin@example.com', 'password'),
    onSuccess: (response) => {
      setToken(response.token)
      setUser(response.user)
      setToast('Logged in as template admin.')
    },
    onError: (error) => setToast(errorMessage(error)),
  })

  const meMutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new ApiError('Login first to call /auth/me.', 0)
      }

      return getMe(token)
    },
    onSuccess: (response) => {
      setUser(response.user)
      setToast('Loaded current user.')
    },
    onError: (error) => setToast(errorMessage(error)),
  })

  const adminFooMutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new ApiError('Login first to call protected RBAC endpoint.', 0)
      }

      return getAdminFoo(token)
    },
    onSuccess: (response) => {
      setAdminFoo(response)
      setToast('Protected endpoint returned data.')
    },
    onError: (error) => setToast(errorMessage(error)),
  })

  const jobMutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new ApiError('Login first to dispatch a queue job.', 0)
      }

      return dispatchDemoJob(token)
    },
    onSuccess: (response) => setToast(response.message),
    onError: (error) => setToast(errorMessage(error)),
  })

  const broadcastMutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new ApiError('Login first to broadcast a demo event.', 0)
      }

      return broadcastDemo(token)
    },
    onSuccess: (response) => setToast(response.message),
    onError: (error) => setToast(errorMessage(error)),
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        return { message: 'Already logged out.' }
      }

      return logout(token)
    },
    onSuccess: () => {
      setToken(null)
      setUser(null)
      setAdminFoo(null)
      setToast('Logged out.')
      void queryClient.invalidateQueries({ queryKey: ['foo'] })
    },
    onError: (error) => setToast(errorMessage(error)),
  })

  const visibleToast = toast ?? (fooQuery.isError ? errorMessage(fooQuery.error) : null)

  return (
    <main className="app-shell">
      <section className="panel" aria-labelledby="template-title">
        <p className="eyebrow">Laravel API + React template</p>
        <h1 id="template-title">{t('title')}</h1>
        <p className="summary">{t('advanced')}</p>

        <div className="status-row">
          <span className={fooQuery.data ? 'status-dot' : 'status-dot pending'} />
          <span>{fooQuery.data ? 'API v1 connected' : 'Checking API v1'}</span>
        </div>

        <div className="actions" aria-label="API actions">
          <button type="button" onClick={() => loginMutation.mutate()}>
            Login
          </button>
          <button type="button" onClick={() => meMutation.mutate()}>
            Me
          </button>
          <button type="button" onClick={() => adminFooMutation.mutate()}>
            Admin Foo
          </button>
          <button type="button" onClick={() => jobMutation.mutate()}>
            Queue Job
          </button>
          <button type="button" onClick={() => broadcastMutation.mutate()}>
            Broadcast
          </button>
          <button type="button" onClick={() => void i18n.changeLanguage('uk')}>
            UK
          </button>
          <button type="button" onClick={() => void i18n.changeLanguage('en')}>
            EN
          </button>
          <button type="button" onClick={() => logoutMutation.mutate()} disabled={!token}>
            Logout
          </button>
        </div>

        <div className="grid">
          <pre className="response-box">
            {JSON.stringify(fooQuery.data ?? { foo: 'loading' }, null, 2)}
          </pre>
          <pre className="response-box">
            {JSON.stringify(
              {
                user,
                adminFoo,
                locale: localeQuery.data,
              },
              null,
              2,
            )}
          </pre>
        </div>
      </section>

      {visibleToast ? (
        <div className="toast" role="status">
          <span>{visibleToast}</span>
          <button type="button" aria-label="Dismiss message" onClick={() => setToast(null)}>
            x
          </button>
        </div>
      ) : null}
    </main>
  )
}

export default App
