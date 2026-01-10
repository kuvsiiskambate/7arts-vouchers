import Link from 'next/link'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    platform: [
      { name: 'Карта', href: '/map' },
      { name: 'Финансиране', href: '/campaigns' },
      { name: 'Събития', href: '/events' },
      { name: 'Работа', href: '/jobs' },
    ],
    company: [
      { name: 'За нас', href: '/about' },
      { name: 'Контакти', href: '/contact' },
      { name: 'Помощ', href: '/help' },
      { name: 'Блог', href: '/blog' },
    ],
    legal: [
      { name: 'Общи условия', href: '/terms' },
      { name: 'Поверителност', href: '/privacy' },
      { name: 'Правила', href: '/guidelines' },
    ],
  }

  return (
    <footer className="border-t border-brand-neon/10 bg-brand-surface">
      <div className="container-brutal py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="neon-gradient">hub</span>
              <span className="text-white">.7arts.bg</span>
            </div>
            <p className="text-gray-400 text-sm">
              Националната оперативна система за култура. Независими творци, устойчиво финансиране, национален мащаб.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/7arts" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-neon transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/7arts" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-neon transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/7arts" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-neon transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/7arts" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-neon transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Платформа</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-neon text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Компания</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-neon text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Правна информация</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-neon text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-brand-neon/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} hub.7arts.bg. Всички права запазени.
            </p>
            <p className="text-gray-500 text-sm">
              Произведено с <span className="text-brand-neon">❤</span> в София, България
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
