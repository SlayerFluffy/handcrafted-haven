'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
]

const authLinks = [
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up' },
]

const Header = () => {
  const pathname = usePathname()

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

  return (
    <header className="bg-gray-800 px-10 py-8">
      <nav className="flex items-center justify-between">
        <div className="flex gap-6">{mainNav}</div>
        <div className="flex items-center gap-4">{authNav}</div>
      </nav>
    </header>
  )
}

export default Header