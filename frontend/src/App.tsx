import { useEffect, useState } from 'react'
import './App.css'

type FooResponse = {
  foo: string
  message: string
}

function App() {
  const [data, setData] = useState<FooResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/foo')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with ${response.status}`)
        }

        return response.json() as Promise<FooResponse>
      })
      .then(setData)
      .catch((caughtError: Error) => setError(caughtError.message))
  }, [])

  return (
    <main className="app-shell">
      <section className="panel" aria-labelledby="template-title">
        <p className="eyebrow">Laravel API + React template</p>
        <h1 id="template-title">Foo Bar Connection</h1>
        <div className="status-row">
          <span className={error ? 'status-dot error' : 'status-dot'} />
          <span>{error ? 'API unavailable' : data ? 'API connected' : 'Checking API'}</span>
        </div>

        <pre className="response-box">
          {error
            ? JSON.stringify({ error }, null, 2)
            : JSON.stringify(data ?? { foo: 'loading' }, null, 2)}
        </pre>
      </section>
    </main>
  )
}

export default App
