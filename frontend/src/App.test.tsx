import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'
import * as api from './lib/api'

vi.mock('./lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./lib/api')>()

  return {
    ...actual,
    getFoo: vi.fn(),
  }
})

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  )
}

test('renders API status after loading foo response', async () => {
  vi.mocked(api.getFoo).mockResolvedValue({
    foo: 'bar',
    message: 'Laravel API v1 is connected to React.',
  })

  renderApp()

  expect(await screen.findByText('API v1 connected')).toBeInTheDocument()
  expect(screen.getByText(/Laravel API v1 is connected to React/)).toBeInTheDocument()
})
