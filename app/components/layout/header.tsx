'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
]

const authLinks = [
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up' },
]

const allLinks = [
  ...navLinks,
  ...authLinks
]

const Header = () => {

  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const mainNav = navLinks.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className={clsx('text-sm font-medium transition-colors', {
        'text-brand-primary': pathname === href,
        'text-brand-text-light hover:text-brand-primary': pathname !== href,
      })}
    >{label}</Link>
  ))

  const authNav = authLinks.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className={clsx('text-sm font-medium transition-colors', {
        'bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-secondary': label === 'Sign Up',
        'text-brand-text-light hover:text-brand-primary': label !== 'Sign Up',
      })}
    >{label}</Link>
  ))

  const mobileNav = allLinks.map(({ href, label }) => {
    const isSignUp = label === 'Sign Up'
    return (
      <Link
        key={href}
        href={href}
        onClick={() => setMenuOpen(false)}
        className={clsx('flex items-center font-medium transition-colors', {
          'justify-center border-2 border-brand-primary text-brand-primary rounded-md py-2 mt-2 hover:bg-brand-primary hover:text-white': isSignUp,
          'justify-between py-3 border-b border-brand-border text-base text-brand-primary': !isSignUp && pathname === href,
          'justify-between py-3 border-b border-brand-border text-base text-brand-text-light hover:text-brand-primary': !isSignUp && pathname !== href,
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

  return (
    <header className="sticky top-0 z-10 bg-brand-surface px-6 md:px-10 py-5 shadow-sm">

      <nav className="flex items-center justify-between">

        <div className="hidden md:flex items-center gap-8">
          <span className="font-semibold text-lg tracking-wide">Handcrafted Haven</span>
          <div className="flex gap-6">{mainNav}</div>
        </div>

        <div className="hidden md:flex items-center gap-4">{authNav}</div>

        <span className="md:hidden font-semibold text-lg tracking-wide">Handcrafted Haven</span>

        <button
          className="md:hidden text-brand-text-light hover:text-brand-primary p-1"
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
        <div className="md:hidden flex flex-col pt-4 border-t border-brand-border mt-4">
          {mobileNav}
        </div>
      )}

    </header>
  )
}

export default Header
