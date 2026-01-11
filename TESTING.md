# Testing Guide — hub.7arts.bg Platform

Ръководство за тестване на цялата платформа локално.

---

## 🚀 Quick Start (5 минути)

### Опция 1: Тестване БЕЗ база данни (за UI testing)

За бързо тестване на дизайна и UI компонентите:

```bash
# 1. Install dependencies
npm install

# 2. Create minimal .env file
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env

# 3. Start dev server
npm run dev
```

Отвори: http://localhost:3000

**Какво ще работи:**
- ✅ Homepage (hero, stats, modules)
- ✅ Design system (brutal theme, components)
- ✅ Navigation (navbar, footer)
- ⚠️ Campaigns page (ще показва error, защото няма база данни)

---

### Опция 2: Пълно тестване (с база данни)

За пълна функционалност с API и database:

#### Стъпка 1: Setup PostgreSQL

**Избор A: Docker (препоръчително)**
```bash
# Start PostgreSQL container
docker run --name hub7arts-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=hub7arts \
  -p 5432:5432 \
  -d postgres:16

# Verify it's running
docker ps
```

**Избор B: Neon.tech (безплатно, cloud)**
1. Отвори https://neon.tech
2. Sign up безплатно
3. Създай нов проект: `hub7arts`
4. Copy connection string

**Избор C: Локален PostgreSQL**
```bash
# macOS
brew install postgresql@16
brew services start postgresql@16

# Ubuntu/Debian
sudo apt install postgresql-16
sudo systemctl start postgresql
```

#### Стъпка 2: Setup Environment

```bash
# Copy example env file
cp .env.example .env
```

Редактирай `.env`:
```bash
# Database (един от трите варианта)

# Docker:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hub7arts"

# Neon.tech:
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/hub7arts?sslmode=require"

# Local PostgreSQL:
DATABASE_URL="postgresql://yourusername@localhost:5432/hub7arts"

# App config (за сега само това е задължително)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="test-secret-key-change-in-production"
```

#### Стъпка 3: Setup Database Schema

```bash
# Install dependencies
npm install

# Push schema to database
npx prisma db push

# Open Prisma Studio (optional - визуална база данни)
npx prisma studio
```

Prisma Studio ще се отвори на http://localhost:5555

#### Стъпка 4: Seed Database (опционално)

Създай demo campaigns за тестване:

```bash
# Create seed script
npm run db:seed
```

Ще създам seed script сега...

---

## 📦 Създаване на Demo Data

Нека създам seed script за тестови данни:
