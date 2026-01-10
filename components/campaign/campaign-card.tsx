'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { formatCurrency, formatRelativeTime } from '@/lib/utils/format'
import { type Campaign } from '@prisma/client'

interface CampaignCardProps {
  campaign: Campaign & {
    creator: {
      name: string | null
      image: string | null
      profile: {
        verified: boolean
      } | null
    }
    _count: {
      pledges: number
    }
  }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const fundingPercentage = (Number(campaign.raisedAmount) / Number(campaign.goalAmount)) * 100
  const daysLeft = Math.ceil((campaign.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const categoryLabels: Record<string, string> = {
    THEATER: 'Театър',
    MUSIC: 'Музика',
    FILM: 'Кино',
    VISUAL_ARTS: 'Визуални изкуства',
    DANCE: 'Танц',
    LITERATURE: 'Литература',
    PHOTOGRAPHY: 'Фотография',
    DESIGN: 'Дизайн',
    CRAFTS: 'Занаяти',
    OTHER: 'Други',
  }

  return (
    <Link href={`/campaigns/${campaign.slug}`}>
      <Card className="group hover:scale-[1.02] transition-all duration-300 h-full cursor-pointer">
        {/* Cover Image */}
        {campaign.coverImage && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={campaign.coverImage}
              alt={campaign.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="neon">
                {categoryLabels[campaign.category]}
              </Badge>
            </div>
            {campaign.creator.profile?.verified && (
              <div className="absolute top-3 right-3">
                <Badge variant="success">
                  ✓ Верифициран
                </Badge>
              </div>
            )}
          </div>
        )}

        <CardHeader>
          <CardTitle className="line-clamp-2 group-hover:text-brand-neon transition-colors">
            {campaign.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {campaign.shortDescription || campaign.description.substring(0, 150) + '...'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Creator */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {campaign.creator.image && (
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={campaign.creator.image}
                  alt={campaign.creator.name || 'Creator'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span>от {campaign.creator.name || 'Анонимен'}</span>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <Progress value={fundingPercentage} variant="neon" size="lg" />
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-brand-neon">
                {formatCurrency(Number(campaign.raisedAmount))}
              </span>
              <span className="text-gray-400">
                от {formatCurrency(Number(campaign.goalAmount))}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-400 pt-2 border-t border-brand-neon/10">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{campaign._count.pledges} поддръжници</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{daysLeft > 0 ? `${daysLeft} дни` : 'Приключила'}</span>
            </div>
          </div>

          {/* Funding mode indicator */}
          {campaign.fundingMode === 'ALL_OR_NOTHING' && fundingPercentage >= 90 && (
            <Badge variant="warning" className="w-full justify-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Близо до цел!
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
