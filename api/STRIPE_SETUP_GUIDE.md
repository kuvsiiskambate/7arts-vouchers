# 🔐 Stripe Setup Guide - Стъпка по Стъпка

Пълно ръководство за настройка на Stripe плащания за 7Arts Vouchers API.

---

## 📝 Съдържание

1. [Създаване на Stripe акаунт](#1-създаване-на-stripe-акаунт)
2. [Вземане на API Keys](#2-вземане-на-api-keys)
3. [Настройка на Webhook](#3-настройка-на-webhook)
4. [Локално тестване](#4-локално-тестване-със-stripe-cli)
5. [Production Setup](#5-production-setup)
6. [Често срещани проблеми](#6-често-срещани-проблеми)

---

## 1. Създаване на Stripe Акаунт

### Стъпка 1.1: Регистрация

1. Отиди на **https://stripe.com**
2. Кликни на **"Start now"** или **"Sign up"**
3. Попълни:
   - Email адрес
   - Име
   - Държава (избери **Bulgaria**)
   - Парола

4. Потвърди email-а си

### Стъпка 1.2: Активирай акаунта

1. След регистрация ще бъдеш пренасочен към **Stripe Dashboard**
2. Попълни бизнес информация:
   - Име на бизнеса: **7Arts**
   - Тип бизнес: избери подходящ
   - Website: **https://vouchers.7arts.bg**

3. За сега можеш да **пропуснеш** пълната активация
   - Stripe позволява тестване без пълна верификация
   - За production ще трябва да попълниш банкови данни и документи

---

## 2. Вземане на API Keys

### Стъпка 2.1: Отвори API Keys страницата

1. В Stripe Dashboard кликни на **"Developers"** (горе вдясно)
2. От менюто избери **"API keys"**

Или директно: **https://dashboard.stripe.com/apikeys**

### Стъпка 2.2: Разбери разликата между Test и Live

Stripe има два режима:

#### 🧪 Test Mode (за разработка)
- **Безплатен** - никакви такси
- Използва **test cards** (4242 4242 4242 4242)
- Реални плащания **НЕ** се правят
- API keys започват с `sk_test_...`

#### 💰 Live Mode (production)
- **Реални плащания** с реални карти
- Stripe взима **комисионна** (обикновено ~2.9% + 0.30€)
- API keys започват с `sk_live_...`

**⚠️ ЗАПОЧНИ С TEST MODE!**

### Стъпка 2.3: Копирай Secret Key

1. Увери се, че си в **Test mode** (toggle горе вдясно)
2. Намери секцията **"Secret key"**
3. Кликни **"Reveal test key"**
4. Копирай ключа (започва с `sk_test_...`)

```bash
# Пример (започва с sk_test_):
sk_test_YOUR_STRIPE_SECRET_KEY_HERE
```

5. Добави го в `.env` файла:

```env
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

### Стъпка 2.4: (Опционално) Publishable Key

За сега **НЕ** ти трябва Publishable Key, защото:
- Всички плащания минават през backend
- Използваме **Stripe Checkout** (hosted page)

Ако в бъдеще искаш custom checkout форма на frontend-а, ще ти трябва.

---

## 3. Настройка на Webhook

Webhooks позволяват на Stripe да изпраща notifications към твоя backend при събития (плащане, refund, etc.)

### Стъпка 3.1: Локално тестване (Development)

За локална разработка **НЕ** създаваш webhook в Dashboard. Вместо това използваш **Stripe CLI**.

👉 Виж секция [#4-локално-тестване-със-stripe-cli](#4-локално-тестване-със-stripe-cli)

### Стъпка 3.2: Production Webhook

Когато deploy-неш в production:

1. Отиди на **https://dashboard.stripe.com/webhooks**
2. Кликни **"Add endpoint"**

3. Попълни:
   - **Endpoint URL**: `https://your-production-domain.com/api/webhook/stripe`

   Примери:
   - `https://api.vouchers.7arts.bg/api/webhook/stripe`
   - `https://7arts-api.onrender.com/api/webhook/stripe`
   - `https://7arts-vouchers-api.railway.app/api/webhook/stripe`

4. Избери **"Select events to listen to"**

5. Добави следните events:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`

6. Кликни **"Add endpoint"**

7. Копирай **Webhook signing secret** (започва с `whsec_...`)

```bash
# Пример:
whsec_YOUR_WEBHOOK_SECRET_HERE
```

8. Добави го в production `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_abc123def...
```

### Стъпка 3.3: Тествай Webhook

1. В Stripe Dashboard → Webhooks → избери endpoint-а
2. Кликни **"Send test webhook"**
3. Избери event type: `checkout.session.completed`
4. Кликни **"Send test webhook"**
5. Провери дали endpoint-ът получава webhook (status 200)

---

## 4. Локално Тестване със Stripe CLI

Stripe CLI позволява да тестваш webhooks локално без да deploy-ваш.

### Стъпка 4.1: Инсталирай Stripe CLI

#### macOS (с Homebrew)
```bash
brew install stripe/stripe-cli/stripe
```

#### Windows (с Scoop)
```bash
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

#### Linux
```bash
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.4/stripe_1.19.4_linux_x86_64.tar.gz
tar -xvf stripe_1.19.4_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin
```

Провери инсталацията:
```bash
stripe --version
```

### Стъпка 4.2: Login

```bash
stripe login
```

1. Ще се отвори браузър
2. Кликни **"Allow access"**
3. Върни се в терминала - ще видиш успешен login message

### Стъпка 4.3: Forward Webhooks към локалния сървър

Отвори **2 терминала**:

**Терминал 1** - Стартирай API сървъра:
```bash
cd api
npm run dev
```

**Терминал 2** - Forward webhooks:
```bash
stripe listen --forward-to localhost:3001/api/webhook/stripe
```

Ще видиш нещо подобно:
```
> Ready! You are using Stripe API Version [2024-10-28].
> Your webhook signing secret is whsec_abc123... (^C to quit)
```

**ВАЖНО:** Копирай webhook secret-а (`whsec_...`) и го добави в `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_abc123def456...
```

### Стъпка 4.4: Тествай плащане

1. Стартирай frontend-а (ако имаш)
2. Или направи test request:

```bash
curl -X POST http://localhost:3001/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "currency": "bgn",
    "voucherType": "individual",
    "voucherFormat": "digital",
    "customerEmail": "test@example.com"
  }'
```

3. Отвори получения Stripe Checkout URL в браузър
4. Използвай **test card**:
   - **Card number:** `4242 4242 4242 4242`
   - **Expiry:** Всяка бъдеща дата (напр. `12/25`)
   - **CVC:** Всякакви 3 цифри (напр. `123`)
   - **Email:** `test@example.com`

5. Кликни **"Pay"**

6. В терминал 2 ще видиш webhook events:
```
2024-01-10 17:30:00   --> checkout.session.completed [evt_abc123...]
2024-01-10 17:30:00  <--  [200] POST http://localhost:3001/api/webhook/stripe [evt_abc123...]
```

7. В терминал 1 (API сървър) ще видиш:
```
🎉 Checkout session completed: cs_test_...
✅ Voucher created successfully: {
  code: '7ARTS-A5K9-L2M4',
  email: 'test@example.com',
  amount: 100
}
```

### Стъпка 4.5: Trigger тестови events

Можеш да trigger-неш конкретни events без реално плащане:

```bash
# Trigger successful checkout
stripe trigger checkout.session.completed

# Trigger successful payment
stripe trigger payment_intent.succeeded

# Trigger failed payment
stripe trigger payment_intent.payment_failed
```

---

## 5. Production Setup

### Стъпка 5.1: Активирай Stripe акаунта за production

1. Отиди на **https://dashboard.stripe.com/account/onboarding**
2. Попълни:
   - Бизнес информация
   - Банкови данни (IBAN за България)
   - Документи за верификация (ако се изисква)

3. Изчакай одобрение (обикновено 1-3 работни дни)

### Стъпка 5.2: Вземи Live API Keys

1. В Stripe Dashboard, превключи към **Live mode** (toggle горе вдясно)
2. Отиди на **Developers → API keys**
3. Копирай **Secret key** (започва с `sk_live_...`)
4. Добави го в production `.env`:

```env
STRIPE_SECRET_KEY=sk_live_abc123...
```

### Стъпка 5.3: Създай Production Webhook

1. Отиди на **Webhooks** (Live mode)
2. Добави endpoint с production URL:
   ```
   https://api.vouchers.7arts.bg/api/webhook/stripe
   ```
3. Избери същите events
4. Копирай **webhook secret** (`whsec_...` за Live mode)
5. Добави го в production `.env`

### Стъпка 5.4: Deploy и тествай

1. Deploy backend-а на production server
2. Направи тестово плащане с **реална карта**
3. Провери в Stripe Dashboard:
   - **Payments** - Трябва да видиш плащането
   - **Webhooks** - Провери дали webhook е получен успешно
4. Провери в твоя backend logs дали ваучерът е създаден

---

## 6. Test Cards

### Успешни плащания

| Card Number | Brand | Description |
|------------|-------|-------------|
| `4242 4242 4242 4242` | Visa | Успешно плащане |
| `5555 5555 5555 4444` | Mastercard | Успешно плащане |
| `3782 822463 10005` | American Express | Успешно плащане |

### Неуспешни плащания

| Card Number | Error |
|------------|-------|
| `4000 0000 0000 0002` | Declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0000 0000 0069` | Expired card |
| `4000 0000 0000 0127` | Incorrect CVC |

### 3D Secure (SCA)

| Card Number | Behavior |
|------------|----------|
| `4000 0027 6000 3184` | 3D Secure required |

За всички карти:
- **Expiry:** Всяка бъдеща дата
- **CVC:** Всякакви 3 цифри (4 за Amex)
- **Postal code:** Всякакъв

---

## 7. Често Срещани Проблеми

### ❌ Грешка: "No such customer"

**Причина:** Customer не е създаден правилно

**Решение:** Използваш `customer_email` вместо да създаваш customer обект. Не е нужно нищо специално.

### ❌ Грешка: "Webhook signature verification failed"

**Причина:** Невалиден `STRIPE_WEBHOOK_SECRET`

**Решение:**
1. Провери дали в `.env` имаш правилния webhook secret
2. За локално тестване използвай secret-а от `stripe listen`
3. За production използвай secret-а от Dashboard → Webhooks

### ❌ Webhook не се получава локално

**Причина:** `stripe listen` не работи или не е стартиран

**Решение:**
```bash
# Терминал 1
npm run dev

# Терминал 2
stripe listen --forward-to localhost:3001/api/webhook/stripe
```

### ❌ CORS грешка от frontend

**Причина:** Backend не позволява frontend origin

**Решение:** Провери `.env`:
```env
CLIENT_URL=http://localhost:5173
```

### ❌ "Invalid API key"

**Причина:** Грешен или невалиден API key

**Решение:**
1. Провери дали си в правилния режим (Test vs Live)
2. Провери дали ключът започва с `sk_test_` или `sk_live_`
3. Regenerate key ако е нужно

### ❌ Плащането е успешно, но ваучер не се създава

**Причина:** Webhook не се получава или има грешка

**Решение:**
1. Провери logs в терминала на API сървъра
2. Провери в Stripe Dashboard → Webhooks дали webhook е изпратен
3. Провери Response status (трябва да е 200)
4. Ако има грешка, виж error message-а

---

## 8. Security Best Practices

### ✅ DO:
- Пази API keys като **environment variables** (`.env`)
- **НИКОГА** не commit-вай `.env` файл в git
- Използвай различни keys за test и production
- Rotate API keys периодично
- Използвай HTTPS за production webhook endpoint
- Верифицирай webhook signatures (backend го прави автоматично)

### ❌ DON'T:
- НЕ споделяй API keys публично
- НЕ hardcode-вай keys в кода
- НЕ използвай Live keys за тестване
- НЕ skip-вай webhook signature verification

---

## 9. Полезни Линкове

- **Stripe Dashboard:** https://dashboard.stripe.com
- **API Keys:** https://dashboard.stripe.com/apikeys
- **Webhooks:** https://dashboard.stripe.com/webhooks
- **Test Cards:** https://stripe.com/docs/testing
- **Stripe CLI Download:** https://stripe.com/docs/stripe-cli
- **Documentation:** https://stripe.com/docs/api
- **Checkout Docs:** https://stripe.com/docs/payments/checkout

---

## 10. Следващи Стъпки

След като настроиш Stripe:

1. ✅ Тествай локално с test cards
2. ✅ Интегрирай frontend с backend
3. ✅ Deploy backend на production server
4. ✅ Настрой production webhook
5. ✅ Активирай Stripe акаунта
6. ✅ Направи първото реално плащане
7. ✅ Setup email изпращане за ваучери
8. ✅ Мониторинг и analytics

---

Готово! Stripe е настроен и готов за използване! 🎉
