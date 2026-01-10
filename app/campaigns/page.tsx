'use client'

import { useState } from 'react'
import { Search, Filter, TrendingUp, Clock, Sparkles } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CampaignCard } from '@/components/campaign/campaign-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { trpc } from '@/lib/trpc/client'

type FilterCategory = 'ALL' | 'THEATER' | 'MUSIC' | 'FILM' | 'VISUAL_ARTS' | 'DANCE' | 'LITERATURE' | 'PHOTOGRAPHY' | 'DESIGN' | 'CRAFTS' | 'OTHER'

export default function CampaignsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<FilterCategory>('ALL')
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'ending'>('trending')

  const categories: { value: FilterCategory; label: string }[] = [
    { value: 'ALL', label: 'Всички' },
    { value: 'THEATER', label: 'Театър' },
    { value: 'MUSIC', label: 'Музика' },
    { value: 'FILM', label: 'Кино' },
    { value: 'VISUAL_ARTS', label: 'Визуални изкуства' },
    { value: 'DANCE', label: 'Танц' },
    { value: 'LITERATURE', label: 'Литература' },
    { value: 'PHOTOGRAPHY', label: 'Фотография' },
    { value: 'DESIGN', label: 'Дизайн' },
  ]

  // Fetch campaigns using tRPC
  const { data, isLoading, isError } = trpc.campaign.list.useQuery({
    category: category === 'ALL' ? undefined : category,
    search: search || undefined,
    limit: 12,
  })

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-24 pb-16">
        {/* Header */}
        <section className="border-b border-brand-neon/10 pb-12 mb-12">
          <div className="container-brutal">
            <div className="max-w-3xl">
              <Badge variant="neon" className="mb-4">
                ФИНАНСИРАНЕ
              </Badge>
              <h1 className="text-5xl font-bold mb-4">
                Открий <span className="neon-gradient">проекти за подкрепа</span>
              </h1>
              <p className="text-xl text-gray-400">
                Децентрализирано финансиране за независима култура. Всеки проект е верифициран и прозрачен.
              </p>
            </div>
          </div>
        </section>

        <div className="container-brutal">
          {/* Filters */}
          <div className="space-y-6 mb-12">
            {/* Search */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="search"
                placeholder="Търси проекти..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    category === cat.value
                      ? 'bg-brand-neon text-brand-dark'
                      : 'bg-brand-surface text-gray-400 hover:bg-brand-blue/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Сортирай по:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={sortBy === 'trending' ? 'neon' : 'outline'}
                  onClick={() => setSortBy('trending')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Популярни
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'recent' ? 'neon' : 'outline'}
                  onClick={() => setSortBy('recent')}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Най-нови
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'ending' ? 'neon' : 'outline'}
                  onClick={() => setSortBy('ending')}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Приключващи скоро
                </Button>
              </div>
            </div>
          </div>

          {/* Campaigns Grid */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="h-48 bg-brand-surface rounded-lg mb-4" />
                  <div className="h-4 bg-brand-surface rounded w-3/4 mb-2" />
                  <div className="h-4 bg-brand-surface rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-12">
              <p className="text-semantic-error">
                Грешка при зареждане на кампаниите. Моля, опитайте отново.
              </p>
            </div>
          )}

          {data && data.campaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Не са намерени кампании. Промени филтрите или {' '}
                <Button variant="ghost" size="sm">
                  създай нова кампания
                </Button>
              </p>
            </div>
          )}

          {data && data.campaigns.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>

              {/* Load more */}
              {data.nextCursor && (
                <div className="text-center mt-12">
                  <Button size="lg" variant="outline">
                    Покажи повече проекти
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Stats */}
          <div className="mt-16 pt-12 border-t border-brand-neon/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold neon-gradient mb-2">450+</div>
                <div className="text-gray-400">Финансирани проекта</div>
              </div>
              <div>
                <div className="text-4xl font-bold neon-gradient mb-2">2.5M BGN</div>
                <div className="text-gray-400">Обща подкрепа</div>
              </div>
              <div>
                <div className="text-4xl font-bold neon-gradient mb-2">12,000+</div>
                <div className="text-gray-400">Поддръжници</div>
              </div>
              <div>
                <div className="text-4xl font-bold neon-gradient mb-2">85%</div>
                <div className="text-gray-400">Успешност</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
