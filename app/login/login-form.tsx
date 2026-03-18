"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/app/lib/auth-client"

const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    })

    setIsSubmitting(false)

    if (error) {
      setErrorMessage(error.message || "Unable to sign in with those credentials.")
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <form
      className="w-full max-w-md space-y-4 rounded-lg border border-border bg-surface p-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-text">Log In</h1>
        <p className="text-sm text-text-light">Enter your email and password.</p>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-text">Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
          placeholder="Email"
          required
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-text">Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary"
          placeholder="Password"
          required
        />
      </label>

      {errorMessage ? (
        <p className="text-sm text-error">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-surface hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Log In"}
      </button>

      <p className="text-sm text-text-light">
        Need an account?{" "}
        <Link className="text-primary hover:text-secondary" href="/signup">
          Sign up
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
