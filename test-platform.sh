#!/bin/bash

# hub.7arts.bg - Quick Testing Script
# Run this to test the platform in minutes

set -e

echo "🎨 hub.7arts.bg - Platform Testing"
echo "=================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
  echo "📝 Creating .env file..."
  cat > .env << 'EOL'
# Minimal config for testing
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=test-secret-change-in-production

# Database (uncomment ONE option)

# Option 1: Docker PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hub7arts"

# Option 2: Neon.tech (replace with your connection string)
# DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/hub7arts?sslmode=require"

# Option 3: Local PostgreSQL
# DATABASE_URL="postgresql://yourusername@localhost:5432/hub7arts"
EOL
  echo "✅ Created .env file"
  echo ""
fi

# Check for database
echo "🗄️  Checking database connection..."
if npx prisma db push --skip-generate > /dev/null 2>&1; then
  echo "✅ Database connected"
else
  echo "⚠️  Database not connected"
  echo ""
  echo "Choose database option:"
  echo "  1. Docker:    docker run --name hub7arts-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=hub7arts -p 5432:5432 -d postgres:16"
  echo "  2. Neon.tech: Sign up at https://neon.tech (free)"
  echo "  3. Local:     brew install postgresql@16 (macOS) or apt install postgresql-16 (Ubuntu)"
  echo ""
  echo "Then update DATABASE_URL in .env"
  exit 1
fi

# Install dependencies
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  echo "✅ Dependencies installed"
  echo ""
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate > /dev/null
echo "✅ Prisma client ready"
echo ""

# Check if database has data
CAMPAIGN_COUNT=$(npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM \"Campaign\"" 2>/dev/null | grep -o '[0-9]\+' | tail -1 || echo "0")

if [ "$CAMPAIGN_COUNT" -eq "0" ]; then
  echo "🌱 Seeding demo data..."
  npm run db:seed
  echo "✅ Demo data created"
  echo ""
else
  echo "✅ Database already has $CAMPAIGN_COUNT campaigns"
  echo ""
fi

echo "🎉 Platform ready for testing!"
echo ""
echo "Run: npm run dev"
echo "Then open: http://localhost:3000"
echo ""
echo "Test pages:"
echo "  - Homepage:  http://localhost:3000"
echo "  - Campaigns: http://localhost:3000/campaigns"
echo "  - Database:  npm run db:studio (opens on :5555)"
echo ""
echo "✨ Brutal. Independent. National-scale. 🇧🇬"
