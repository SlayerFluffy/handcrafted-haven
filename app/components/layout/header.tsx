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
        'text-white': pathname === href,
        'text-gray-400 hover:text-white': pathname !== href,
      })}
    >{label}</Link>
  ))

  const authNav = authLinks.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className={clsx('text-sm font-medium transition-colors', {
        'bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100': label === 'Sign Up',
        'text-gray-400 hover:text-white': label !== 'Sign Up',
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
          'justify-center border border-white text-white rounded-md py-2 mt-2 hover:bg-white hover:text-gray-900': isSignUp,
          'justify-between py-3 border-b border-gray-700 text-base text-white': !isSignUp && pathname === href,
          'justify-between py-3 border-b border-gray-700 text-base text-gray-400 hover:text-white': !isSignUp && pathname !== href,
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
    <header className="bg-transparent px-6 md:px-10 py-5 shadow-lg relative z-1">

      <nav className="flex items-center justify-between">

        <div className="hidden md:flex items-center gap-8">
          <span className="text-white font-semibold text-lg tracking-wide">Handcrafted Haven</span>
          <div className="flex gap-6">{mainNav}</div>
        </div>

        <div className="hidden md:flex items-center gap-4">{authNav}</div>

        <span className="md:hidden text-white font-semibold text-lg tracking-wide">Handcrafted Haven</span>
        
        <button
          className="md:hidden text-gray-400 hover:text-white text-3xl leading-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >{menuOpen ? '✕' : '☰'}</button>

      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col pt-4 border-t border-gray-700 mt-4">
          {mobileNav}
        </div>
      )}

    </header>
  )
}

export default Header