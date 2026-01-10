'use client'

import Link from 'next/link'
import { Menu, X, Search, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Карта', href: '/map' },
    { name: 'Финансиране', href: '/campaigns' },
    { name: 'Събития', href: '/events' },
    { name: 'Работа', href: '/jobs' },
    { name: 'За нас', href: '/about' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-brand-neon/10">
      <div className="container-brutal">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="neon-gradient">hub</span>
              <span className="text-white">.7arts.bg</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-brand-neon transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-brand-surface rounded-md transition-colors">
              <Search className="w-5 h-5 text-gray-300" />
            </button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Вход
            </Button>
            <Button variant="neon" size="sm">
              Създай проект
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-brand-neon/10">
          <div className="container-brutal py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-brand-neon transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-brand-neon/10 space-y-2">
              <Button variant="ghost" size="sm" className="w-full">
                <User className="w-4 h-4 mr-2" />
                Вход
              </Button>
              <Button variant="neon" size="sm" className="w-full">
                Създай проект
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
