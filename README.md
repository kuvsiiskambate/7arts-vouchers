# hub.7arts.bg — National Cultural Operating System

> Bulgaria's brutal, category-defining platform for independent culture. Funding, events, jobs, and reputation — all in one place.

---

## 🎯 What Is This?

**hub.7arts.bg** is not another event listing site. This is **national cultural infrastructure**.

### Core Vision
- **Independent artists first**: Built for creators, not institutions
- **Scalable**: From local shows to national festivals
- **Monetizable**: Every module generates sustainable revenue
- **Institution-ready**: Compliant with Bulgarian law, GDPR, and tax regulations
- **Category-defining**: The platform other countries will copy

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, tRPC v11 (type-safe APIs)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v5 (multi-role, OAuth support)
- **Payments**: Stripe Connect (marketplace escrow)
- **Maps**: Mapbox GL JS
- **Deployment**: Vercel (frontend + serverless API)

### Core Modules

#### 1. **Cultural Map** (`/map`)
National graph of artists, organizations, venues, and events. Interactive discovery and collaboration.

#### 2. **Funding & Crowdfunding** (`/campaigns`)
- **All-or-nothing** (Kickstarter model)
- **Flexible funding** (Indiegogo model)
- **Pre-sales** (tickets, merch, digital)
- **Patronage** (recurring support)
- **Grant applications** (NCF, municipalities)
- **Corporate sponsorships** (brand matching)

#### 3. **Events & Ticketing** (`/events`)
Full event lifecycle: create, promote, sell tickets, manage capacity, revenue splitting.

#### 4. **Jobs & Gigs** (`/jobs`)
Labor marketplace for cultural production. Skill matching, escrow payments, reputation tracking.

#### 5. **Profiles & Reputation**
Identity layer with portfolios, reviews, endorsements, and algorithmic reputation scoring.

#### 6. **Data Dashboards**
Real-time analytics for artists, venues, and public cultural activity heatmaps.

#### 7. **Governance & Trust**
Dispute resolution, content moderation, platform democracy, and transparency reports.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 16+ (or use Neon/Supabase free tier)
- Stripe account (for payments)
- Mapbox account (for maps)

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone https://github.com/kuvsiiskambate/7arts-vouchers.git
   cd 7arts-vouchers
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

   Key variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `STRIPE_SECRET_KEY`: Stripe API key
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Mapbox access token

3. **Set up database**:
   ```bash
   npx prisma db push
   npx prisma db seed  # Optional: seed with demo data
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Database Management

- **Prisma Studio** (visual database browser):
  ```bash
  npm run db:studio
  ```

- **Generate Prisma Client** (after schema changes):
  ```bash
  npm run db:generate
  ```

- **Push schema changes**:
  ```bash
  npm run db:push
  ```

---

## 📁 Project Structure

```
hub.7arts.bg/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage (landing)
│   ├── campaigns/           # Crowdfunding module
│   ├── events/              # Events & ticketing
│   ├── jobs/                # Jobs & gigs
│   ├── map/                 # Cultural map
│   ├── api/                 # API routes
│   │   └── trpc/            # tRPC endpoints
│   └── layout.tsx           # Root layout
│
├── components/              # React components
│   ├── ui/                  # Base UI (Button, Card, Input, etc.)
│   ├── campaign/            # Campaign-specific components
│   ├── event/               # Event-specific components
│   └── layout/              # Navbar, Footer, etc.
│
├── lib/                     # Core libraries
│   ├── db.ts                # Prisma client
│   ├── trpc/                # tRPC setup
│   │   ├── routers/         # API routers (campaign, event, job, etc.)
│   │   └── trpc.ts          # tRPC config
│   └── utils/               # Utilities (format, cn, etc.)
│
├── prisma/
│   └── schema.prisma        # Database schema
│
├── public/                  # Static assets
│
├── PLATFORM_ARCHITECTURE.md # Full product architecture
├── TECHNICAL_STACK.md       # Technical implementation guide
└── README.md                # This file
```

---

## 🎨 Design System

### 7Arts Brutal Theme

**Color Palette**:
- `brand-dark`: #0B1120 (primary background)
- `brand-neon`: #00E5FF (electric cyan accent)
- `brand-blue`: #1E3A8A (secondary blue)
- `brand-surface`: #111827 (card backgrounds)

**Typography**:
- Font: Montserrat (300, 400, 600, 700)
- Bulgarian and Latin support

**Components**:
- **Glass Cards**: `backdrop-blur-lg` with neon borders
- **Neon Buttons**: Electric cyan with glow effects
- **Brutal Inputs**: Dark with neon focus rings

### Example Usage

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function Example() {
  return (
    <Card glow className="p-6">
      <h2 className="text-3xl font-bold neon-gradient">
        Brutal Design
      </h2>
      <Button variant="neon" size="lg">
        Create Project
      </Button>
    </Card>
  )
}
```

---

## 🔌 API (tRPC)

### Type-Safe Client-Server Communication

All APIs are type-safe using tRPC. No manual API contracts needed.

**Example: List Campaigns**

```tsx
'use client'
import { trpc } from '@/lib/trpc/client'

export function CampaignsList() {
  const { data, isLoading } = trpc.campaign.list.useQuery({
    category: 'THEATER',
    limit: 12,
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {data?.campaigns.map((campaign) => (
        <div key={campaign.id}>{campaign.title}</div>
      ))}
    </div>
  )
}
```

**Available Routers**:
- `campaign`: Create, list, view, pledge, update
- `event`: (Coming soon)
- `job`: (Coming soon)
- `profile`: (Coming soon)

---

## 💳 Payments (Stripe Connect)

### How It Works

1. **Creator onboards** to Stripe Connect (Express account)
2. **Backer pledges** funds via campaign page
3. **Funds held in escrow** until campaign succeeds
4. **Automatic disbursement** to creator (minus platform fee)

**Platform Fee Structure**:
- Crowdfunding: 5% (all-or-nothing), 7% (flexible)
- Pre-sales: 3%
- Events: 3-5%
- Jobs: 10%

---

## 🗺️ Roadmap

### MVP (Months 1-6) ✅
- [x] Platform architecture designed
- [x] Next.js app structure
- [x] Prisma database schema
- [x] 7Arts design system
- [x] tRPC API setup
- [x] Campaign listing page
- [ ] Campaign detail page
- [ ] Campaign creation flow
- [ ] Stripe integration
- [ ] NextAuth authentication

### Phase 2 (Months 7-12)
- [ ] Events & ticketing module
- [ ] Jobs & gigs module
- [ ] Cultural map with Mapbox
- [ ] Reputation system
- [ ] Premium subscriptions

### Phase 3 (Months 13-18)
- [ ] Grant integration (NCF, municipalities)
- [ ] Corporate sponsorship matching
- [ ] Public dashboards (cultural heatmaps)
- [ ] Admin moderation tools

### Phase 4 (Year 2+)
- [ ] API ecosystem (third-party integrations)
- [ ] White-label solutions
- [ ] International expansion (English, multi-currency)
- [ ] Mobile apps (iOS, Android)

---

## 🤝 Contributing

This is a private, mission-critical platform for Bulgarian culture. Contributions are welcome from trusted collaborators.

### Development Workflow

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m "Add amazing feature"`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

### Code Standards
- TypeScript strict mode
- Tailwind for styling (no CSS files)
- tRPC for all APIs
- Prisma for database access
- Bulgarian UI text (English code comments)

---

## 📄 License

Copyright © 2026 7Arts. All rights reserved.

---

## 📞 Contact

- **Website**: [7arts.bg](https://7arts.bg)
- **Email**: hello@7arts.bg
- **Platform**: [hub.7arts.bg](https://hub.7arts.bg)

---

**Made with ❤️ in Sofia, Bulgaria**

*Brutal. Independent. National-scale.*
