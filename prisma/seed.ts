import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.pledge.deleteMany()
  await prisma.reward.deleteMany()
  await prisma.campaignUpdate.deleteMany()
  await prisma.campaign.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.user.deleteMany()

  // Create demo users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'ivan@theater.bg',
        name: 'Иван Петров',
        role: 'ARTIST',
        emailVerified: new Date(),
        profile: {
          create: {
            bio: 'Театрален режисьор с 15 години опит. Експериментален театър и съвременна драматургия.',
            location: 'София',
            city: 'София',
            genres: ['Театър', 'Перформанс'],
            skills: ['Режисура', 'Драматургия', 'Педагогика'],
            verified: true,
            verifiedAt: new Date(),
            reputationScore: 92,
            totalProjects: 12,
            successfulProjects: 11,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'maria@music.bg',
        name: 'Мария Георгиева',
        role: 'ARTIST',
        emailVerified: new Date(),
        profile: {
          create: {
            bio: 'Джаз певица и композитор. Експерименти със звук и традиция.',
            location: 'Пловдив',
            city: 'Пловдив',
            genres: ['Музика', 'Джаз', 'Експериментална'],
            skills: ['Вокал', 'Композиция', 'Пиано'],
            verified: true,
            verifiedAt: new Date(),
            reputationScore: 88,
            totalProjects: 8,
            successfulProjects: 7,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'georgi@film.bg',
        name: 'Георги Димитров',
        role: 'ARTIST',
        emailVerified: new Date(),
        profile: {
          create: {
            bio: 'Независим филмов режисьор. Документално и експериментално кино.',
            location: 'Варна',
            city: 'Варна',
            genres: ['Кино', 'Документално'],
            skills: ['Режисура', 'Кинематография', 'Монтаж'],
            verified: false,
            reputationScore: 75,
            totalProjects: 5,
            successfulProjects: 4,
          },
        },
      },
    }),
  ])

  console.log(`✅ Created ${users.length} demo users`)

  // Create demo campaigns
  const campaigns = await Promise.all([
    // Active campaign 1
    prisma.campaign.create({
      data: {
        creatorId: users[0].id,
        title: 'Hamlet в софийското метро',
        slug: 'hamlet-metro-sofia-abc123',
        description: `# Проектът

Иновативна постановка на "Hamlet" в подлезите и коридорите на софийското метро. Зрителят ще следва актьорите през станциите, ставайки част от действието.

## Защо това е важно?

Театърът трябва да излезе от салоните и да срещне хората там, където са. Метрото е артерията на града - точно там искаме да разкажем тази история за власт, предателство и избор.

## Какво ще направим?

- 10 представления в метрото (станции НДК, Сердика, Софийски университет)
- Специална звукова инсталация
- Интерактивни сцени със зрителите
- Документален филм за процеса`,
        shortDescription: 'Hamlet в софийското метро - театър, който излиза при хората',
        category: 'THEATER',
        fundingMode: 'ALL_OR_NOTHING',
        goalAmount: 15000,
        raisedAmount: 8750,
        currency: 'BGN',
        platformFee: 5,
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-02-28'),
        duration: 58,
        status: 'ACTIVE',
        publishedAt: new Date('2026-01-01'),
        approved: true,
        approvedAt: new Date('2026-01-01'),
        backerCount: 47,
        views: 1234,
        budgetBreakdown: [
          { category: 'Актьори', amount: 6000, description: '6 актьора x 1000 BGN' },
          { category: 'Сценография', amount: 3000, description: 'Специални инсталации' },
          { category: 'Звук и светлина', amount: 2500, description: 'Оборудване и техници' },
          { category: 'Разрешения', amount: 1500, description: 'Метрополитен и comune' },
          { category: 'Маркетинг', amount: 1000, description: 'Промоция и дизайн' },
          { category: 'Платформена такса', amount: 1000, description: '5% + payment processing' },
        ],
      },
    }),

    // Active campaign 2
    prisma.campaign.create({
      data: {
        creatorId: users[1].id,
        title: 'Балкански джаз албум "Корени"',
        slug: 'balkanski-jazz-koreni-def456',
        description: `# Албумът "Корени"

Джаз проект, който преосмисля българския фолклор. 8 авторски композиции, вдъхновени от тракийски ритми, странджански песни и родопска полифония.

## Екипът

- Мария Георгиева - вокал, композиции
- Петър Иванов - контрабас
- Стоян Янков - барабани
- Елена Димитрова - саксофон

## Записът

Записът ще се състои в Studio X София с продуцент Иван Шопов. Планираме 5 дни студио + 2 дни миксиране и мастериране.

## Издаването

- Физическо издание (CD + vinyl)
- Дигитална дистрибуция (Spotify, Apple Music, Bandcamp)
- Release концерт в Cinematic Hall
- Видео клип към водещия сингъл`,
        shortDescription: 'Джаз среща фолклор - албум, който преоткрива балканските корени',
        category: 'MUSIC',
        fundingMode: 'ALL_OR_NOTHING',
        goalAmount: 12000,
        raisedAmount: 9200,
        currency: 'BGN',
        platformFee: 5,
        startDate: new Date('2025-12-15'),
        endDate: new Date('2026-02-15'),
        duration: 62,
        status: 'ACTIVE',
        publishedAt: new Date('2025-12-15'),
        approved: true,
        approvedAt: new Date('2025-12-15'),
        backerCount: 62,
        views: 2156,
        budgetBreakdown: [
          { category: 'Студио време', amount: 5000, description: '7 дни @ Studio X' },
          { category: 'Миксиране & мастериране', amount: 2000, description: 'Продуцент + инженер' },
          { category: 'Pressing vinyl', amount: 2500, description: '300 бройки' },
          { category: 'Release концерт', amount: 1500, description: 'Venue + звук' },
          { category: 'Видео клип', amount: 1000, description: 'Режисьор + камера' },
        ],
      },
    }),

    // Active campaign 3
    prisma.campaign.create({
      data: {
        creatorId: users[2].id,
        title: 'Документален филм "Последните майстори"',
        slug: 'posledni-maystori-film-ghi789',
        description: `# "Последните майстори"

Документален филм за изчезващите занаяти в България. Портрети на последните тъкачи, грънчари, коларии ковачи, които пазят вековни традиции.

## Концепцията

Снимаме в продължение на 6 месеца из цяла България - от Котел до Чипровци, от Трявна до Широка лъка. Интимни портрети, споделени истории, ръце, които помнят.

## Екипът

- Режисьор: Георги Димитров
- Оператор: Калина Петрова
- Звук: Мартин Стоянов
- Монтаж: Ивайло Христов

## След филма

- Фестивална програма (София Film Fest, Golden Rose, международни фестивали)
- Прожекции в малките градове, където сме снимали
- Безплатни прожекции за училища
- Архив от 50+ часа материал, достъпен за изследователи`,
        shortDescription: 'Документален филм за последните занаятчии в България',
        category: 'FILM',
        fundingMode: 'FLEXIBLE',
        goalAmount: 25000,
        raisedAmount: 6400,
        currency: 'BGN',
        platformFee: 7,
        startDate: new Date('2026-01-05'),
        endDate: new Date('2026-03-31'),
        duration: 85,
        status: 'ACTIVE',
        publishedAt: new Date('2026-01-05'),
        approved: true,
        approvedAt: new Date('2026-01-05'),
        backerCount: 34,
        views: 892,
        budgetBreakdown: [
          { category: 'Камера и оборудване', amount: 8000, description: 'Наем за 6 месеца' },
          { category: 'Пътни разходи', amount: 5000, description: 'Гориво, настаняване' },
          { category: 'Екип', amount: 8000, description: 'Оператор, звук, асистенти' },
          { category: 'Постпродукция', amount: 3000, description: 'Монтаж, цветокорекция, звук' },
          { category: 'Дистрибуция', amount: 1000, description: 'DCP master, субтитри' },
        ],
      },
    }),

    // Recently successful campaign
    prisma.campaign.create({
      data: {
        creatorId: users[0].id,
        title: 'Моноспектакъл "Самота"',
        slug: 'monospektakul-samota-jkl012',
        description: 'Интимен моноспектакъл за самотата в големия град. Игра: Иван Петров.',
        category: 'THEATER',
        fundingMode: 'ALL_OR_NOTHING',
        goalAmount: 5000,
        raisedAmount: 6200,
        currency: 'BGN',
        platformFee: 5,
        startDate: new Date('2025-11-01'),
        endDate: new Date('2025-12-31'),
        duration: 60,
        status: 'SUCCESSFUL',
        publishedAt: new Date('2025-11-01'),
        fundedAt: new Date('2025-12-15'),
        completedAt: new Date('2026-01-10'),
        approved: true,
        approvedAt: new Date('2025-11-01'),
        backerCount: 78,
        views: 3421,
      },
    }),
  ])

  console.log(`✅ Created ${campaigns.length} demo campaigns`)

  // Add rewards to active campaigns
  const rewards = await Promise.all([
    // Hamlet rewards
    prisma.reward.create({
      data: {
        campaignId: campaigns[0].id,
        title: 'Благодарност в програмата',
        description: 'Името ти в печатната програма + digital poster',
        price: 20,
        quantityTotal: 100,
        quantityClaimed: 15,
        position: 1,
        digitalDelivery: true,
        shippingRequired: false,
        estimatedDelivery: new Date('2026-03-15'),
      },
    }),
    prisma.reward.create({
      data: {
        campaignId: campaigns[0].id,
        title: '1 билет за премиерата',
        description: 'Билет за премиерното представление + програма + poster',
        price: 50,
        quantityTotal: 50,
        quantityClaimed: 32,
        position: 2,
        shippingRequired: false,
        estimatedDelivery: new Date('2026-03-20'),
      },
    }),
    prisma.reward.create({
      data: {
        campaignId: campaigns[0].id,
        title: 'VIP пакет',
        description: '2 билета + backstage тур + среща с актьорите + limited edition poster',
        price: 150,
        quantityTotal: 20,
        quantityClaimed: 8,
        position: 3,
        shippingRequired: true,
        estimatedDelivery: new Date('2026-03-20'),
      },
    }),

    // Jazz album rewards
    prisma.reward.create({
      data: {
        campaignId: campaigns[1].id,
        title: 'Digital album',
        description: 'Албумът в lossless quality (FLAC + MP3) + liner notes PDF',
        price: 25,
        quantityTotal: null, // unlimited
        quantityClaimed: 42,
        position: 1,
        digitalDelivery: true,
        shippingRequired: false,
        estimatedDelivery: new Date('2026-04-01'),
      },
    }),
    prisma.reward.create({
      data: {
        campaignId: campaigns[1].id,
        title: 'CD копие',
        description: 'Physical CD + digital download + poster',
        price: 40,
        quantityTotal: 200,
        quantityClaimed: 18,
        position: 2,
        shippingRequired: true,
        estimatedDelivery: new Date('2026-04-15'),
      },
    }),
    prisma.reward.create({
      data: {
        campaignId: campaigns[1].id,
        title: 'Vinyl + концерт',
        description: 'Limited edition vinyl (300 copies) + 2 билета за release концерта + signed poster',
        price: 120,
        quantityTotal: 50,
        quantityClaimed: 12,
        position: 3,
        shippingRequired: true,
        estimatedDelivery: new Date('2026-04-30'),
      },
    }),
  ])

  console.log(`✅ Created ${rewards.length} rewards`)

  // Add some campaign updates
  const updates = await Promise.all([
    prisma.campaignUpdate.create({
      data: {
        campaignId: campaigns[0].id,
        title: 'Първа репетиция в метрото!',
        content: `Днес направихме първата си репетиция на станция НДК. Енергията е невероятна!

Хората се спираха да гледат, някои дори аплодираха. Точно това е идеята - театърът да излезе при хората.

Следващата седмица започваме работа по звуковата инсталация. Stay tuned!`,
        public: true,
      },
    }),
    prisma.campaignUpdate.create({
      data: {
        campaignId: campaigns[1].id,
        title: 'Първи ден в студиото',
        content: `Записахме първите две композиции - "Тракийски ритми" и "Странджа". Звучи магично!

Специални благодарности на Studio X за перфектната акустика и на продуцент Иван Шопов за невероятната енергия.

Още 5 дни напред. Да вървим!`,
        public: true,
      },
    }),
  ])

  console.log(`✅ Created ${updates.length} campaign updates`)

  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📊 Summary:')
  console.log(`   - ${users.length} users`)
  console.log(`   - ${campaigns.length} campaigns (3 active, 1 successful)`)
  console.log(`   - ${rewards.length} rewards`)
  console.log(`   - ${updates.length} updates`)
  console.log('\n✨ You can now run: npm run dev')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
