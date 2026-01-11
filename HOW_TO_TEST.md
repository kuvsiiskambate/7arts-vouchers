# Как да тестваш hub.7arts.bg платформата

## ⚡ Бързо тестване (2 минути)

### Метод 1: Автоматичен скрипт (препоръчително)

```bash
# 1. Run test script
./test-platform.sh

# 2. Start server
npm run dev
```

Отвори: **http://localhost:3000**

---

### Метод 2: Ръчно (стъпка по стъпка)

#### Стъпка 1: Стартирай база данни

**Избери ЕДИН от трите варианта:**

**А) Docker (най-лесен вариант):**
```bash
docker run --name hub7arts-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=hub7arts \
  -p 5432:5432 \
  -d postgres:16
```

**Б) Neon.tech (безплатен cloud):**
1. Отвори https://neon.tech
2. Sign up
3. Create project "hub7arts"
4. Copy connection string

**В) Локален PostgreSQL:**
```bash
# macOS
brew install postgresql@16
brew services start postgresql@16

# Ubuntu
sudo apt install postgresql-16
```

#### Стъпка 2: Setup проекта

```bash
# Install packages
npm install

# Create .env file
cp .env.example .env
```

Редактирай `.env` и добави твоя DATABASE_URL:
```bash
# Docker:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hub7arts"

# Neon:
DATABASE_URL="твоя-neon-connection-string"

# Local:
DATABASE_URL="postgresql://твоето-име@localhost:5432/hub7arts"
```

#### Стъпка 3: Setup база данни

```bash
# Generate Prisma client
npx prisma generate

# Create tables
npx prisma db push

# Seed demo data (3 campaigns, 3 users)
npm run db:seed
```

#### Стъпка 4: Run

```bash
npm run dev
```

Отвори: **http://localhost:3000**

---

## ✅ Какво да проверя?

### Homepage (http://localhost:3000)

Трябва да видиш:
- ✅ Hero секция с "Българската оперативна система за култура"
- ✅ Статистики (2,500+ творци, 450+ проекти)
- ✅ 4 модула (Карта, Финансиране, събития, Работа)
- ✅ Neon cyan (#00E5FF) accents
- ✅ Dark background (#0B1120)
- ✅ Glass morphism cards

### Campaigns Page (http://localhost:3000/campaigns)

Трябва да видиш:
- ✅ 3 campaigns:
  - "Hamlet в софийското метро" (8750 / 15000 BGN)
  - "Балкански джаз албум" (9200 / 12000 BGN)
  - "Документален филм" (6400 / 25000 BGN)

- ✅ Filters работят:
  - Click "Театър" → показва само Hamlet
  - Click "Музика" → показва само Jazz album
  - Search "hamlet" → намеренфилма

- ✅ Progress bars показват procenta
- ✅ Creator names (Иван Петров, Мария Георгиева, etc.)

### Design System

- ✅ Dark theme (#0B1120 background)
- ✅ Neon buttons with glow effect
- ✅ Glass cards (backdrop-blur)
- ✅ Montserrat font
- ✅ Responsive на mobile
- ✅ Smooth hover animations

---

## 🔍 Advanced Testing

### Database Visual Tool (Prisma Studio)

```bash
npm run db:studio
```

Отваря се на **http://localhost:5555**

Можеш да:
- Виждаш всички campaigns, users, rewards
- Редактираш данни директно
- Добавяш нови campaigns
- Изтриваш records

### API Testing

Create `test.ts`:
```typescript
import { db } from './lib/db'

async function test() {
  const campaigns = await db.campaign.findMany({
    include: { creator: true, rewards: true }
  })

  console.log(`Found ${campaigns.length} campaigns`)
  campaigns.forEach(c => {
    console.log(`- ${c.title}: ${c.raisedAmount}/${c.goalAmount} BGN`)
  })
}

test()
```

Run:
```bash
npx tsx test.ts
```

### Browser DevTools

1. Open http://localhost:3000/campaigns
2. Open Chrome DevTools (F12)
3. Go to Network tab
4. Refresh page
5. Look for `trpc/campaign.list` request
6. Inspect response → should see campaign data

---

## 🐛 Common Problems

### "Can't connect to database"

```bash
# Check if PostgreSQL is running
docker ps  # for Docker

# Test connection
npx prisma db push
```

**Fix:** Make sure DATABASE_URL in .env is correct

### "Module not found"

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
npx prisma generate
```

### "Port 3000 already in use"

```bash
# Kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### "Seed fails"

```bash
# Reset database
npx prisma db push --force-reset

# Try seed again
npm run db:seed
```

---

## 📊 Demo Data Created

### Users:
1. **Иван Петров** (ivan@theater.bg)
   - Role: Artist
   - City: София
   - Reputation: 92/100
   - Campaign: "Hamlet в метрото"

2. **Мария Георгиева** (maria@music.bg)
   - Role: Artist
   - City: Пловдив
   - Reputation: 88/100
   - Campaign: "Джаз албум"

3. **Георги Димитров** (georgi@film.bg)
   - Role: Artist
   - City: Варна
   - Reputation: 75/100
   - Campaign: "Документален филм"

### Campaigns:
- **3 Active** (can be pledged to)
- **1 Successful** (already funded)
- **6 Rewards** (different pricing tiers)
- **2 Updates** (campaign progress posts)

---

## ✨ Success Criteria

Platform is working correctly when:

| Check | Expected Result |
|-------|----------------|
| Homepage loads | ✅ Hero + stats + modules visible |
| Campaigns page | ✅ 3 campaigns shown |
| Filters work | ✅ Can filter by category |
| Search works | ✅ Can search "hamlet" |
| Design | ✅ Dark theme + neon accents |
| Mobile | ✅ Responsive layout |
| API calls | ✅ Network tab shows tRPC requests |
| No errors | ✅ Clean browser console |

---

## 🚀 Next Steps After Testing

Once everything works:

1. **Explore the code:**
   ```
   app/page.tsx          → Homepage
   app/campaigns/page.tsx → Campaigns listing
   components/ui/        → Design system
   lib/trpc/routers/     → API endpoints
   prisma/schema.prisma  → Database schema
   ```

2. **Build new features:**
   - Campaign detail page (`/campaigns/[slug]`)
   - User authentication (NextAuth)
   - Stripe payments
   - Events module
   - Jobs module

3. **Read documentation:**
   - `PLATFORM_ARCHITECTURE.md` → Full product vision
   - `TECHNICAL_STACK.md` → Tech details
   - `TESTING_GUIDE.md` → Complete testing guide

---

## 💡 Tips

### Quick Reload
```bash
# After code changes, just save file
# Next.js auto-reloads with Fast Refresh
```

### Database Changes
```bash
# After editing prisma/schema.prisma:
npx prisma db push
npx prisma generate

# Restart dev server
```

### Type Errors
```bash
# Regenerate types
npx prisma generate

# Restart TypeScript in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

---

## 🎯 You're Ready!

Ако всичко работи:
- ✅ Homepage загружа
- ✅ Campaigns page показва 3 проекта
- ✅ Design е brutal & neon
- ✅ Няма errors в конзолата

**Можеш да започнеш да градиш!**

Brutal. Independent. National-scale. 🇧🇬
