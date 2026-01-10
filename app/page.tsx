import Link from 'next/link'
import { ArrowRight, Map, TrendingUp, Briefcase, Users, Calendar, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  const stats = [
    { label: 'Активни творци', value: '2,500+', icon: Users },
    { label: 'Финансирани проекти', value: '450+', icon: TrendingUp },
    { label: 'Предстоящи събития', value: '1,200+', icon: Calendar },
    { label: 'Общо подкрепа', value: '2.5M BGN', icon: Zap },
  ]

  const modules = [
    {
      title: 'Културна карта',
      description: 'Национален граф на творци, организации, места и събития. Открий, свържи се, сътрудничи.',
      icon: Map,
      href: '/map',
      color: 'brand-neon',
    },
    {
      title: 'Финансиране',
      description: 'Crowdfunding, предварителни продажби, патронаж и грантове. Децентрализирано финансиране за независима култура.',
      icon: TrendingUp,
      href: '/campaigns',
      color: 'semantic-success',
    },
    {
      title: 'Події & Билети',
      description: 'Създай, промотирай, продавай. Цялостна система за културни събития с прозрачно разпределение на приходи.',
      icon: Calendar,
      href: '/events',
      color: 'semantic-info',
    },
    {
      title: 'Работа & Гигове',
      description: 'Пазар на труда за културна продукция. Намери таланти, получи поръчки, гради репутация.',
      icon: Briefcase,
      href: '/jobs',
      color: 'semantic-warning',
    },
  ]

  const features = [
    {
      title: 'Независими творци на първо място',
      description: 'Платформата е създадена за независими артисти, не за институции. Институциите се адаптират към платформата, не обратното.',
      icon: Shield,
    },
    {
      title: 'Национален мащаб',
      description: 'Това не е още един сайт за събития. Това е националната инфраструктура за култура.',
      icon: Map,
    },
    {
      title: 'Устойчиво монетизиране',
      description: 'Всеки модул генерира приходи. Устойчивостта не е опционална.',
      icon: TrendingUp,
    },
    {
      title: 'Доверие & прозрачност',
      description: 'Escrow плащания, репутационна система, публични данни, общностна модерация.',
      icon: Users,
    },
  ]

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-brand-dark to-brand-dark" />

          {/* Floating elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-brand-neon/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

          <div className="container-brutal relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="neon" className="mx-auto">
                НАЦИОНАЛНА КУЛТУРНА ИНФРАСТРУКТУРА
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold">
                Българската{' '}
                <span className="neon-gradient">оперативна система</span>{' '}
                за култура
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Финансирай проекти. Продавай билети. Намери работа. Гради репутация.
                Всичко, от което независимият творец се нуждае, на едно място.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="text-lg px-8">
                  Започни проект
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="ghost" className="text-lg px-8">
                  Разгледай картата
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="flex justify-center">
                      <stat.icon className="w-8 h-8 text-brand-neon" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold neon-gradient">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="py-20 bg-gradient-to-b from-brand-dark to-brand-surface">
          <div className="container-brutal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Четири <span className="neon-gradient">основни модула</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Интегрирана екосистема за цялостно управление на културна дейност
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {modules.map((module) => (
                <Card key={module.title} glow className="group hover:scale-[1.02] transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-3 bg-brand-neon/10 rounded-lg neon-glow">
                        <module.icon className="w-8 h-8 text-brand-neon" />
                      </div>
                      <CardTitle className="text-2xl">{module.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={module.href}>
                      <Button variant="ghost" className="w-full group-hover:bg-brand-neon/10">
                        Разгледай модул
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container-brutal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Защо <span className="neon-gradient">hub.7arts.bg</span>?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Не поредният сайт за листинг. Категорично дефиниращата платформа.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-brand-neon/10 rounded-lg neon-glow">
                      <feature.icon className="w-6 h-6 text-brand-neon" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-blue/20 via-brand-neon/10 to-brand-blue/20">
          <div className="container-brutal">
            <Card glow className="max-w-4xl mx-auto text-center">
              <CardContent className="py-16 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Готов да създадеш{' '}
                  <span className="neon-gradient">нещо брутално</span>?
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Присъедини се към хилядите творци, които вече изграждат бъдещето на българската култура.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button size="lg" className="text-lg px-8">
                    Създай безплатен профил
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="ghost" className="text-lg px-8">
                    Научи повече
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
