'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'
import { authClient } from '@/app/lib/auth-client'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/users', label: 'Creators' },
]

const authedBaseLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  // { href: '/dashboard/profile', label: 'My Profile' },
]

const guestLinks = [
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up' },
]

const avatarFallback = (value?: string | null) => value?.trim().charAt(0).toUpperCase() || 'U'

const Header = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session, isPending } = authClient.useSession()
  const visibleNavLinks = [...navLinks, ...authedBaseLinks]
  const profileHref = session?.user?.id ? `/users/${session.user.id}` : '/dashboard/profile'
  const displayName = session?.user?.name || session?.user?.email || 'User'

  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    setMenuOpen(false)
    router.push("/")
    router.refresh()
  }

  const mainNav = visibleNavLinks.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className={clsx('text-sm', {
        'text-text': pathname === href,
        'text-text-light hover:text-text': pathname !== href,
      })}
    >{label}</Link>
  ))

  const authNav = session ? (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleSignOut}
        className="text-sm text-text-light hover:text-text"
      >
        Log Out
      </button>

      <Link
        href={profileHref}
        aria-label="View profile"
        className="rounded-full transition hover:opacity-85"
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={`${displayName} profile`}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-text">
            {avatarFallback(displayName)}
          </div>
        )}
      </Link>
    </div>
  ) : (
    guestLinks.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className={clsx("text-sm", {
          "rounded-md bg-primary px-4 py-2 text-surface hover:bg-secondary": label === "Sign Up",
          "text-text": label !== "Sign Up" && pathname === href,
          "text-text-light hover:text-text": label !== "Sign Up" && pathname !== href,
        })}
      >{label}</Link>
    ))
  )

  const mobileNav = visibleNavLinks.map(({ href, label }) => {
    const isSignUp = label === 'Sign Up'
    return (
      <Link
        key={href}
        href={href}
        onClick={() => setMenuOpen(false)}
        className={clsx('flex items-center font-medium transition-colors', {
          'mt-2 justify-center rounded-md border-2 border-primary py-2 text-primary hover:bg-primary hover:text-surface': isSignUp,
          'justify-between border-b border-border py-3 text-base text-primary': !isSignUp && pathname === href,
          'justify-between border-b border-border py-3 text-base text-text-light hover:text-primary': !isSignUp && pathname !== href,
        })}
      >
        {label}
        {!isSignUp && (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </Link>
    )
  })

  const mobileAuthNav = session ? (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex items-center justify-between border-b border-border py-3 text-base font-medium text-text-light transition-colors hover:text-primary"
    >
      Log Out
    </button>
  ) : (
    guestLinks.map(({ href, label }) => {
      const isSignUp = label === 'Sign Up'
      return (
        <Link
          key={href}
          href={href}
          onClick={() => setMenuOpen(false)}
          className={clsx('flex items-center font-medium transition-colors', {
            'mt-2 justify-center rounded-md border-2 border-primary py-2 text-primary hover:bg-primary hover:text-surface': isSignUp,
            'justify-between border-b border-border py-3 text-base text-primary': !isSignUp && pathname === href,
            'justify-between border-b border-border py-3 text-base text-text-light hover:text-primary': !isSignUp && pathname !== href,
          })}
        >
          {label}
          {!isSignUp && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </Link>
      )
    })
  )

  return (
    <header className="sticky top-0 z-10 bg-surface px-6 py-5 shadow-sm md:px-10">

      <nav className="flex items-center justify-between">

        <div className="hidden md:flex items-center gap-8">
          <span className="font-semibold text-lg tracking-wide">Handcrafted Haven</span>
          <div className="flex gap-6">{mainNav}</div>
        </div>

        <div className="hidden min-h-9 items-center gap-4 md:flex">
          {!isPending ? authNav : null}
        </div>

        <span className="md:hidden font-semibold text-lg tracking-wide">Handcrafted Haven</span>

        <button
          className="p-1 text-text-light hover:text-primary md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

      </nav>

      {menuOpen && (
        <div className="mt-4 flex flex-col border-t border-border pt-4 md:hidden">
          {mobileNav}
          {!isPending ? mobileAuthNav : null}
        </div>
      )}

    </header>
  )
}

export default Header
