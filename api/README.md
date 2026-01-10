# 7Arts Vouchers API 🎁

Production-ready backend API за управление на подаръчни ваучери със Stripe плащания.

## 🚀 Quick Start

### 1. Инсталация

```bash
cd api
npm install
```

### 2. Конфигурация

Създай `.env` файл от темплейта:

```bash
cp .env.example .env
```

Попълни `.env` с твоите Stripe credentials:

```env
PORT=3001
NODE_ENV=development

# Stripe keys от https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

CLIENT_URL=http://localhost:5173
```

### 3. Стартиране

```bash
# Development режим
npm run dev

# Production режим
npm start
```

Сървърът стартира на `http://localhost:3001`

---

## 📋 API Endpoints

### 🔹 POST `/api/create-checkout-session`

Създава Stripe Checkout Session за покупка на ваучер.

**Request Body:**

```json
{
  "amount": 150,
  "currency": "bgn",
  "quantity": 1,
  "voucherType": "individual",
  "voucherFormat": "digital",
  "customerEmail": "customer@example.com"
}
```

**Parameters:**

- `amount` (number, required) - Стойност на ваучера
- `currency` (string, optional) - Валута, по подразбиране "bgn"
- `quantity` (number, optional) - Количество, по подразбиране 1
- `voucherType` (string, required) - "individual" | "corporate"
- `voucherFormat` (string, required) - "digital" | "physical"
- `customerEmail` (string, required) - Email на клиента

**Response:**

```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

**Frontend Integration Example:**

```javascript
// Frontend код за създаване на checkout session
async function handlePurchase(voucherData) {
  const response = await fetch('http://localhost:3001/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: 150,
      currency: 'bgn',
      quantity: 1,
      voucherType: 'individual',
      voucherFormat: 'digital',
      customerEmail: 'customer@example.com'
    })
  });

  const { url } = await response.json();

  // Redirect към Stripe Checkout
  window.location.href = url;
}
```

### 🔹 POST `/api/webhook/stripe`

Получава Stripe webhook events. Stripe автоматично извиква този endpoint.

**⚠️ ВАЖНО:** Не се извиква директно от frontend!

**Events обработени:**

- `checkout.session.completed` - Генерира ваучер след успешно плащане
- `payment_intent.succeeded` - Логва успешно плащане
- `payment_intent.payment_failed` - Логва неуспешно плащане

### 🔹 GET `/health`

Health check endpoint.

**Response:**

```json
{
  "status": "ok",
  "service": "7Arts Vouchers API",
  "timestamp": "2026-01-10T17:42:00.000Z"
}
```

### 🔹 GET `/`

API информация и налични endpoints.

---

## 🔧 Как работи Stripe интеграцията

### 1. Frontend създава Checkout Session

```
Frontend → POST /api/create-checkout-session → Backend
Backend → Stripe API → Създава session
Backend → връща URL → Frontend
Frontend → Redirect user → Stripe Checkout Page
```

### 2. Клиентът плаща в Stripe

```
User → Stripe Checkout Page → Попълва карта → Плаща
```

### 3. Stripe изпраща webhook към Backend

```
Stripe → POST /api/webhook/stripe → Backend
Backend → Генерира код (7ARTS-XXXX-XXXX)
Backend → Записва ваучер
Backend → Изпраща email (mock за сега)
```

---

## 🔑 Stripe Setup

### 1. Създай Stripe Account

Отиди на https://stripe.com и създай акаунт.

### 2. Вземи API Keys

1. Отвори [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. За **тестване** използвай Test mode keys:
   - Secret key: `sk_test_...`
3. За **production** използвай Live mode keys:
   - Secret key: `sk_live_...`

### 3. Setup Webhook

#### A. Локално тестване със Stripe CLI

Инсталирай Stripe CLI:

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Linux
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.4/stripe_1.19.4_linux_x86_64.tar.gz
tar -xvf stripe_1.19.4_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin
```

Login и тествай webhook:

```bash
# Login
stripe login

# Forward webhooks към локалния сървър
stripe listen --forward-to localhost:3001/api/webhook/stripe

# Копирай webhook secret (whsec_...) в .env файла
```

Тествай checkout flow:

```bash
# Trigger test webhook
stripe trigger checkout.session.completed
```

#### B. Production Webhook Setup

1. Отиди на [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Кликни "Add endpoint"
3. Добави URL: `https://your-domain.com/api/webhook/stripe`
4. Избери events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Копирай Webhook secret (`whsec_...`) в production `.env`

---

## 🎫 Voucher System

### Voucher Code Format

Всеки ваучер получава уникален код във формат:

```
7ARTS-XXXX-XXXX

Примери:
7ARTS-A5K9-L2M4
7ARTS-B7T3-W9Q1
```

### Voucher Data Structure

```json
{
  "code": "7ARTS-A5K9-L2M4",
  "amount": 150,
  "currency": "BGN",
  "voucherType": "individual",
  "voucherFormat": "digital",
  "customerEmail": "customer@example.com",
  "status": "active",
  "createdAt": "2026-01-10T17:42:00.000Z",
  "stripeSessionId": "cs_test_...",
  "paymentStatus": "paid"
}
```

### Voucher Statuses

- `active` - Ваучерът е валиден и може да се използва
- `redeemed` - Ваучерът е използван

### Storage

В момента vouchers се съхраняват:
- **In-memory** - За бърз достъп
- **JSON file** (`data/vouchers.json`) - За персистентност

За production препоръчва се:
- PostgreSQL
- MongoDB
- Supabase
- PlanetScale

---

## 📧 Email Изпращане

Понастоящем email изпращането е **mock** (само се логва в конзолата).

### TODO: Интегриране на Email Service

Избери един от следните services:

#### SendGrid

```bash
npm install @sendgrid/mail
```

```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: voucher.customerEmail,
  from: 'vouchers@7arts.bg',
  subject: 'Your 7Arts Gift Voucher',
  html: generateEmailHTML(voucher)
});
```

#### Mailgun

```bash
npm install mailgun-js
```

#### Resend

```bash
npm install resend
```

---

## 🚢 Deployment

### Option 1: Render

1. Създай нов Web Service на [Render](https://render.com)
2. Свържи GitHub repo
3. Build Command: `cd api && npm install`
4. Start Command: `cd api && npm start`
5. Добави Environment Variables:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   CLIENT_URL=https://vouchers.7arts.bg
   NODE_ENV=production
   ```

### Option 2: Railway

1. Отиди на [Railway](https://railway.app)
2. New Project → Deploy from GitHub
3. Избери repo
4. Root directory: `api`
5. Добави Environment Variables

### Option 3: VPS (DigitalOcean, Linode, etc.)

```bash
# На сървъра
git clone your-repo
cd your-repo/api
npm install --production

# Setup PM2 за process management
npm install -g pm2
pm2 start index.js --name "7arts-api"
pm2 startup
pm2 save

# Setup Nginx като reverse proxy
# /etc/nginx/sites-available/7arts-api
server {
    listen 80;
    server_name api.vouchers.7arts.bg;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🧪 Testing

### Test Cards (Stripe Test Mode)

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184

Expiry: Any future date
CVC: Any 3 digits
```

### Manual Testing Flow

1. Стартирай API сървъра
2. Стартирай Stripe webhook forwarding:
   ```bash
   stripe listen --forward-to localhost:3001/api/webhook/stripe
   ```
3. Създай checkout session от frontend
4. Използвай test card за плащане
5. Провери в конзолата за създаден ваучер

---

## 📁 Project Structure

```
api/
├── controllers/
│   ├── checkoutController.js    # Checkout session логика
│   └── webhookController.js     # Webhook обработка
├── routes/
│   ├── checkout.js              # Checkout routes
│   └── webhook.js               # Webhook routes
├── utils/
│   ├── voucherGenerator.js      # Генериране на кодове
│   └── voucherStorage.js        # In-memory + JSON storage
├── data/
│   ├── vouchers.json            # Voucher данни (gitignored)
│   └── .gitignore
├── index.js                     # Main server file
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🔒 Security

- ✅ Stripe webhook signature verification
- ✅ CORS protection
- ✅ Environment variables за sensitive data
- ✅ Input validation на всички endpoints
- ⚠️ За production добави:
  - Rate limiting (express-rate-limit)
  - Helmet.js за security headers
  - Request logging (Morgan)

---

## 📊 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3001 |
| `NODE_ENV` | Environment | No | development |
| `STRIPE_SECRET_KEY` | Stripe API key | Yes | - |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | Yes | - |
| `CLIENT_URL` | Frontend URL | Yes | - |

---

## 🐛 Troubleshooting

### Webhook не работи

```bash
# Провери дали webhook secret е правилен
stripe listen --forward-to localhost:3001/api/webhook/stripe

# Провери logs в Stripe Dashboard
https://dashboard.stripe.com/webhooks
```

### CORS грешка

Провери дали `CLIENT_URL` в `.env` съответства на frontend URL.

### Ваучерите не се записват

Провери дали `data/` директорията съществува и има write permissions:

```bash
chmod 755 data/
```

---

## 📝 TODO за Production

- [ ] Интегрирай реален email service (SendGrid/Mailgun)
- [ ] Замени JSON storage с PostgreSQL/MongoDB
- [ ] Добави rate limiting
- [ ] Добави request logging (Morgan)
- [ ] Добави error tracking (Sentry)
- [ ] Създай admin endpoint за voucher management
- [ ] Добави voucher redemption endpoint
- [ ] Имплементирай voucher validation
- [ ] Добави analytics tracking

---

## 📄 License

ISC

---

## 🤝 Support

За въпроси: vouchers@7arts.bg
