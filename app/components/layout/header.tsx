'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/sellers', label: 'Sellers' },
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up' },
]

const Header = () => {
  const pathname = usePathname()

  const navLinks = links.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className={clsx('text-sm font-medium transition-colors', {
        'text-white': pathname === href,
        'text-gray-400 hover:text-white': pathname !== href,
      })}
    >{label}</Link>
  ))

  return (
    <header className="bg-gray-800 px-10 py-8">
      <nav className="flex gap-6">
        {navLinks}
      </nav>
    </header>
  )
}

export default Header