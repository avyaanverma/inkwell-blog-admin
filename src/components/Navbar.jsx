import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'dark'
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }

  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
      <header className="sticky top-0 z-50 w-full border-b border-[var(--nav-border)] bg-[var(--nav-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--nav-bg)]/70">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <a className="flex items-center gap-2" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-[var(--accent)]"
              aria-hidden="true"
            >
              <path d="M13 21h8" />
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            </svg>
            <span className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">Inkwell</span>
          </a>
          <nav className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--card-border)]/30"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
            <div className="flex items-center gap-2">
              <a
                className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--card-border)]/30"
                href="/login"
              >
                Login
              </a>
              <a
                className="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--accent)] px-4 text-sm font-medium text-white transition hover:bg-[var(--accent-hover)]"
                href="/register"
              >
                Sign Up
              </a>
            </div>
          </nav>
        </div>
      </header>
  )
}

export default Navbar
