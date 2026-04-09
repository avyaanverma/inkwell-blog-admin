import React from 'react'
import Navbar from '../components/Navbar'
import { useForm } from "react-hook-form"

const Register = () => {
  const {register, reset, handleSubmit, formValues: {errors}} = useForm({
    mode: true
  });

  const handleForm = ()=>{
    console.log(formValues)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <Navbar />

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center px-4 py-12">
        <section className="w-full max-w-xl rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 shadow-sm">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
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
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M13 21h8" />
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Create an Account</h1>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Join Inkwell to start reading or writing</p>
            </div>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-lg border border-[var(--card-border)] bg-transparent px-4 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[var(--card-border)] bg-transparent px-4 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full rounded-lg border border-[var(--card-border)] bg-transparent px-4 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-[var(--card-border)] bg-transparent px-4 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            <div className="space-y-3">
              <span className="text-sm font-medium">Account Type</span>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    defaultChecked
                    className="peer sr-only"
                  />
                  <span className="block rounded-xl border border-[var(--card-border)] bg-transparent px-4 py-3 text-left text-sm font-semibold text-[var(--text-primary)] transition peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)]/10 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent)]/40">
                    Reader
                    <span className="mt-1 block text-xs font-normal text-[var(--text-secondary)]">
                      Read articles
                    </span>
                  </span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    className="peer sr-only"
                  />
                  <span className="block rounded-xl border border-[var(--card-border)] bg-transparent px-4 py-3 text-left text-sm font-semibold text-[var(--text-primary)] transition peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)]/10 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent)]/40">
                    Author
                    <span className="mt-1 block text-xs font-normal text-[var(--text-secondary)]">
                      Write &amp; publish
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{' '}
            <a className="font-semibold text-[var(--accent)]" href="/login">
              Sign in
            </a>
          </p>
        </section>
      </main>
    </div>
  )
}

export default Register
