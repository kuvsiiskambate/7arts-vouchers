# Testing Guide — hub.7arts.bg Platform

Complete guide for testing the entire platform locally.

---

## 🚀 Quick Start (5 минути)

### Method 1: UI Testing Only (No Database)

For quick design and UI component testing:

```bash
# 1. Install dependencies
npm install

# 2. Create minimal .env
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env

# 3. Start dev server
npm run dev
```

Open: **http://localhost:3000**

**What works:**
- ✅ Homepage (hero, stats, modules)
- ✅ Design system (brutal theme)
- ✅ Navigation
- ⚠️ Campaigns page (will error without database)

---

### Method 2: Full Testing (With Database)

#### Step 1: Setup PostgreSQL

**Option A: Docker (Recommended)**
```bash
docker run --name hub7arts-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=hub7arts \
  -p 5432:5432 \
  -d postgres:16

docker ps  # Verify running
```

**Option B: Neon.tech (Free Cloud)**
1. Go to https://neon.tech
2. Sign up (free)
3. Create project: `hub7arts`
4. Copy connection string

**Option C: Local PostgreSQL**
```bash
# macOS
brew install postgresql@16
brew services start postgresql@16

# Ubuntu
sudo apt install postgresql-16
sudo systemctl start postgresql
```

#### Step 2: Environment Setup

```bash
cp .env.example .env
```

Edit `.env`:
```bash
# Database (choose one)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hub7arts"  # Docker
# DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/hub7arts?sslmode=require"  # Neon

# Required
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="test-secret-change-in-production"
```

#### Step 3: Database Setup

```bash
npm install
npx prisma generate
npx prisma db push
```

#### Step 4: Seed Demo Data

```bash
npm run db:seed
```

Creates:
- ✅ 3 demo users (Иван, Мария, Георги)
- ✅ 4 campaigns (3 active, 1 successful)
- ✅ 6 rewards
- ✅ 2 updates

#### Step 5: Run Development Server

```bash
npm run dev
```

Open: **http://localhost:3000**

---

## ✅ Testing Checklist

### Database
- [ ] PostgreSQL running
- [ ] `npx prisma db push` works
- [ ] `npx prisma studio` opens on :5555
- [ ] Seed data visible

### Development Server
- [ ] `npm run dev` starts
- [ ] No errors in terminal
- [ ] http://localhost:3000 loads
- [ ] No browser console errors

### Homepage (/)
- [ ] Hero section with neon text
- [ ] Stats (2,500+ creators, etc.)
- [ ] 4 module cards
- [ ] Features section
- [ ] Footer links

### Campaigns (/campaigns)
- [ ] Page loads
- [ ] 3 campaigns visible
- [ ] Category filters work
- [ ] Search works (try "Hamlet")
- [ ] Progress bars showing
- [ ] Creator names visible

### Design System
- [ ] Dark background (#0B1120)
- [ ] Neon cyan (#00E5FF) accents
- [ ] Glass morphism cards
- [ ] Glow effects on hover
- [ ] Montserrat font
- [ ] Mobile responsive

### API (tRPC)
- [ ] Network tab shows `trpc/campaign.list`
- [ ] Response has data
- [ ] Type-safe in code editor
- [ ] No TypeScript errors

---

## 🧪 Testing Tools

### Prisma Studio (Database GUI)

```bash
npm run db:studio
```

Opens on **http://localhost:5555**

- View all tables
- Edit records
- Add/delete data
- Search and filter

### API Testing

Create `test-api.ts`:

```typescript
import { db } from './lib/db'

async function test() {
  const campaigns = await db.campaign.findMany({
    where: { status: 'ACTIVE' },
    include: { creator: true, rewards: true }
  })

  console.log(`Found ${campaigns.length} campaigns`)
  console.log(campaigns[0])
}

test()
```

Run:
```bash
npx tsx test-api.ts
```

---

## 🐛 Common Issues

### "Can't connect to database"

```bash
# Check PostgreSQL
docker ps  # If using Docker

# Test connection
npx prisma db push

# Check .env
cat .env | grep DATABASE_URL
```

### "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
npx prisma generate
```

### "Type errors in tRPC"

```bash
npx prisma generate
# Restart TS server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### "Port 3000 in use"

```bash
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm run dev
```

---

## 📊 Demo Accounts

Seed creates these users:

| Email | Name | Role | City | Campaigns |
|-------|------|------|------|-----------|
| ivan@theater.bg | Иван Петров | Artist | София | Hamlet в метрото |
| maria@music.bg | Мария Георгиева | Artist | Пловдив | Джаз албум |
| georgi@film.bg | Георги Димитров | Artist | Варна | Документален филм |

---

## 🚀 Next Steps

Once testing passes:

1. **Add Authentication**
   - NextAuth setup
   - Login/register pages
   - Protected routes

2. **Campaign Detail Page**
   - `/campaigns/[slug]` route
   - Pledge modal
   - Rewards selection

3. **Stripe Integration**
   - Connect accounts
   - Payment flow
   - Webhooks

4. **Deploy**
   - Vercel deployment
   - Production database
   - Environment variables

---

## ✨ Success Indicators

Platform is ready when:

✅ All campaigns visible on /campaigns
✅ Filters and search work
✅ Design matches 7Arts theme
✅ No console errors
✅ Mobile responsive
✅ tRPC calls type-safe
✅ Database seeded correctly

**Brutal. Independent. National-scale.** 🇧🇬
