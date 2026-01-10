# 🔐 Admin Authentication & Management Guide

Ръководство за административен достъп и управление на ваучери.

---

## 📋 Съдържание

1. [Setup на Admin Credentials](#1-setup-на-admin-credentials)
2. [Authentication Methods](#2-authentication-methods)
3. [Admin Endpoints](#3-admin-endpoints)
4. [Voucher Management](#4-voucher-management)
5. [Примери за използване](#5-примери-за-използване)

---

## 1. Setup на Admin Credentials

### Стъпка 1: Създай `.env` файл

```bash
cd api
cp .env.example .env
```

### Стъпка 2: Избери Authentication Method

Има **2 метода** за admin authentication:

#### Method 1: Username & Password (Basic Auth)

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!
```

**Предимства:**
- Лесен за setup
- Може да се споделя с team members
- Познат механизъм

**Недостатъци:**
- По-малко сигурен от API key
- Credentials в Base64 (но HTTPS го защитава)

#### Method 2: API Key (Препоръчан)

```env
ADMIN_API_KEY=7arts_admin_abc123def456ghi789jkl012mno345
```

**Предимства:**
- По-сигурен
- Лесно се rotate-ва
- Може да създадеш множество keys

**Недостатъци:**
- Трябва да го пазиш сигурно

### Стъпка 3: Генерирай силен API Key

**Linux/macOS:**
```bash
# Генерирай random API key
openssl rand -hex 32
# Резултат: 7a3f9b2c8d4e5f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4
```

**Node.js:**
```javascript
const crypto = require('crypto');
console.log('7arts_admin_' + crypto.randomBytes(32).toString('hex'));
```

**Online Generator:**
- https://www.uuidgenerator.net/api/guid

Добави prefix за разпознаване:
```
7arts_admin_abc123def456...
```

### Стъпка 4: Добави в `.env`

```env
# Избери ЕДИН от двата метода:

# Method 1: Basic Auth
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!

# Method 2: API Key (препоръчан)
ADMIN_API_KEY=7arts_admin_7a3f9b2c8d4e5f6a1b2c3d4e5f6a7b8c
```

### ⚠️ Production Security

**НИКОГА** не използвай слаби credentials в production:

❌ **Лоши примери:**
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
ADMIN_API_KEY=123456
```

✅ **Добри примери:**
```
ADMIN_USERNAME=7arts_admin_2024
ADMIN_PASSWORD=X9$mK2#pL8@qR5*nW3!vB7
ADMIN_API_KEY=7arts_admin_7a3f9b2c8d4e5f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d
```

---

## 2. Authentication Methods

### Method 1: Basic Auth (Username/Password)

Изпраща credentials в `Authorization` header.

**cURL пример:**
```bash
curl -X GET http://localhost:3001/api/admin/vouchers \
  -u admin:YourSecurePassword123!
```

**JavaScript/Fetch пример:**
```javascript
const username = 'admin';
const password = 'YourSecurePassword123!';
const credentials = btoa(`${username}:${password}`); // Base64 encode

fetch('http://localhost:3001/api/admin/vouchers', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Postman:**
1. Authorization tab
2. Type: **Basic Auth**
3. Username: `admin`
4. Password: `YourSecurePassword123!`

### Method 2: API Key (X-API-Key Header)

Изпраща API key в custom header.

**cURL пример:**
```bash
curl -X GET http://localhost:3001/api/admin/vouchers \
  -H "X-API-Key: 7arts_admin_abc123..."
```

**JavaScript/Fetch пример:**
```javascript
fetch('http://localhost:3001/api/admin/vouchers', {
  headers: {
    'X-API-Key': '7arts_admin_abc123...'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Postman:**
1. Headers tab
2. Key: `X-API-Key`
3. Value: `7arts_admin_abc123...`

---

## 3. Admin Endpoints

Всички admin endpoints изискват authentication.

### 📊 GET `/api/admin/vouchers`

Връща всички ваучери + статистики.

**Request:**
```bash
curl -X GET http://localhost:3001/api/admin/vouchers \
  -H "X-API-Key: YOUR_API_KEY"
```

**Response:**
```json
{
  "vouchers": [
    {
      "code": "7ARTS-A5K9-L2M4",
      "amount": 150,
      "currency": "BGN",
      "voucherType": "individual",
      "voucherFormat": "digital",
      "customerEmail": "customer@example.com",
      "status": "active",
      "createdAt": "2024-01-10T17:30:00.000Z",
      "stripeSessionId": "cs_test_..."
    }
  ],
  "stats": {
    "total": 15,
    "active": 12,
    "redeemed": 3,
    "totalAmount": 2250,
    "byCurrency": { "BGN": 15 },
    "byType": { "individual": 10, "corporate": 5 },
    "byFormat": { "digital": 12, "physical": 3 }
  }
}
```

---

### 🔍 GET `/api/admin/vouchers/:code`

Връща детайли за конкретен ваучер.

**Request:**
```bash
curl -X GET http://localhost:3001/api/admin/vouchers/7ARTS-A5K9-L2M4 \
  -H "X-API-Key: YOUR_API_KEY"
```

**Response:**
```json
{
  "code": "7ARTS-A5K9-L2M4",
  "amount": 150,
  "currency": "BGN",
  "voucherType": "individual",
  "voucherFormat": "digital",
  "customerEmail": "customer@example.com",
  "status": "active",
  "createdAt": "2024-01-10T17:30:00.000Z",
  "stripeSessionId": "cs_test_abc123",
  "paymentStatus": "paid"
}
```

---

### 📈 GET `/api/admin/stats`

Подробна статистика.

**Request:**
```bash
curl -X GET http://localhost:3001/api/admin/stats \
  -H "X-API-Key: YOUR_API_KEY"
```

**Response:**
```json
{
  "overview": {
    "totalVouchers": 15,
    "activeVouchers": 12,
    "redeemedVouchers": 3,
    "totalValue": 2250,
    "averageValue": 150
  },
  "byType": {
    "individual": 10,
    "corporate": 5
  },
  "byFormat": {
    "digital": 12,
    "physical": 3
  },
  "byCurrency": {
    "BGN": {
      "count": 15,
      "totalValue": 2250
    }
  },
  "recentVouchers": [
    {
      "code": "7ARTS-A5K9-L2M4",
      "amount": 150,
      "status": "active",
      "createdAt": "2024-01-10T17:30:00.000Z"
    }
  ]
}
```

---

### 🔎 GET `/api/admin/search`

Търси ваучери по критерии.

**Query Parameters:**
- `email` - Филтър по customer email
- `status` - `active` или `redeemed`
- `type` - `individual` или `corporate`
- `format` - `digital` или `physical`
- `minAmount` - Минимална стойност
- `maxAmount` - Максимална стойност

**Примери:**

Търси по email:
```bash
curl -X GET "http://localhost:3001/api/admin/search?email=customer@example.com" \
  -H "X-API-Key: YOUR_API_KEY"
```

Търси активни individual ваучери:
```bash
curl -X GET "http://localhost:3001/api/admin/search?status=active&type=individual" \
  -H "X-API-Key: YOUR_API_KEY"
```

Търси ваучери между 100-200 BGN:
```bash
curl -X GET "http://localhost:3001/api/admin/search?minAmount=100&maxAmount=200" \
  -H "X-API-Key: YOUR_API_KEY"
```

**Response:**
```json
{
  "count": 5,
  "vouchers": [
    {
      "code": "7ARTS-A5K9-L2M4",
      "amount": 150,
      "status": "active",
      ...
    }
  ]
}
```

---

## 4. Voucher Management

### ✅ Валидиране на ваучер (PUBLIC endpoint)

**Endpoint:** `POST /api/vouchers/validate`

**Не изисква authentication** - клиентите могат да проверяват ваучерите си.

**Request:**
```bash
curl -X POST http://localhost:3001/api/vouchers/validate \
  -H "Content-Type: application/json" \
  -d '{"code": "7ARTS-A5K9-L2M4"}'
```

**Response (валиден):**
```json
{
  "valid": true,
  "voucher": {
    "code": "7ARTS-A5K9-L2M4",
    "amount": 150,
    "currency": "BGN",
    "voucherType": "individual",
    "status": "active"
  },
  "message": "Voucher is valid and ready to use"
}
```

**Response (използван):**
```json
{
  "valid": false,
  "error": "Voucher already used",
  "message": "This voucher has already been redeemed",
  "redeemedAt": "2024-01-10T18:00:00.000Z"
}
```

---

### 🎁 Използване (Redeem) на ваучер (PUBLIC endpoint)

**Endpoint:** `POST /api/vouchers/redeem`

**Request:**
```bash
curl -X POST http://localhost:3001/api/vouchers/redeem \
  -H "Content-Type: application/json" \
  -d '{
    "code": "7ARTS-A5K9-L2M4",
    "customerEmail": "customer@example.com"
  }'
```

**Response (успешно):**
```json
{
  "success": true,
  "message": "Voucher redeemed successfully",
  "voucher": {
    "code": "7ARTS-A5K9-L2M4",
    "amount": 150,
    "currency": "BGN",
    "redeemedAt": "2024-01-10T18:00:00.000Z"
  }
}
```

**Response (грешка):**
```json
{
  "success": false,
  "error": "Voucher already redeemed"
}
```

---

### ⚡ Бърза проверка (PUBLIC endpoint)

**Endpoint:** `GET /api/vouchers/check/:code`

Само проверява съществуване и статус.

**Request:**
```bash
curl http://localhost:3001/api/vouchers/check/7ARTS-A5K9-L2M4
```

**Response:**
```json
{
  "exists": true,
  "valid": true,
  "status": "active",
  "amount": 150,
  "currency": "BGN"
}
```

---

## 5. Примери за Използване

### Frontend Integration - Admin Dashboard

```javascript
// Admin login и fetch vouchers
class AdminAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'http://localhost:3001';
  }

  async getAllVouchers() {
    const response = await fetch(`${this.baseURL}/api/admin/vouchers`, {
      headers: {
        'X-API-Key': this.apiKey
      }
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    return await response.json();
  }

  async getStats() {
    const response = await fetch(`${this.baseURL}/api/admin/stats`, {
      headers: {
        'X-API-Key': this.apiKey
      }
    });
    return await response.json();
  }

  async searchVouchers(params) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `${this.baseURL}/api/admin/search?${queryString}`,
      {
        headers: {
          'X-API-Key': this.apiKey
        }
      }
    );
    return await response.json();
  }
}

// Използване
const admin = new AdminAPI('7arts_admin_abc123...');

// Вземи всички ваучери
const data = await admin.getAllVouchers();
console.log(`Total vouchers: ${data.stats.total}`);
console.log(`Active: ${data.stats.active}`);

// Търси по email
const results = await admin.searchVouchers({ email: 'customer@example.com' });
console.log(results.vouchers);
```

---

### React Admin Dashboard Example

```jsx
import { useState, useEffect } from 'react';

function AdminDashboard() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('adminApiKey') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/stats', {
        headers: {
          'X-API-Key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Invalid API key');
      }

      localStorage.setItem('adminApiKey', apiKey);
      setIsAuthenticated(true);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const loadData = async () => {
    const response = await fetch('http://localhost:3001/api/admin/vouchers', {
      headers: {
        'X-API-Key': apiKey
      }
    });
    const data = await response.json();
    setVouchers(data.vouchers);
    setStats(data.stats);
  };

  if (!isAuthenticated) {
    return (
      <div className="login">
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button onClick={login}>Login</button>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>7Arts Vouchers Admin</h1>

      {stats && (
        <div className="stats">
          <div className="stat-card">
            <h3>Total Vouchers</h3>
            <p>{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3>Active</h3>
            <p>{stats.active}</p>
          </div>
          <div className="stat-card">
            <h3>Redeemed</h3>
            <p>{stats.redeemed}</p>
          </div>
          <div className="stat-card">
            <h3>Total Value</h3>
            <p>{stats.totalAmount} BGN</p>
          </div>
        </div>
      )}

      <table className="vouchers-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Email</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map(v => (
            <tr key={v.code}>
              <td>{v.code}</td>
              <td>{v.amount} {v.currency}</td>
              <td>{v.voucherType}</td>
              <td className={v.status}>{v.status}</td>
              <td>{v.customerEmail}</td>
              <td>{new Date(v.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
```

---

## 6. Security Best Practices

### ✅ DO:

1. **Използвай HTTPS в production**
   - HTTP изпраща credentials in plain text
   - HTTPS криптира всички данни

2. **Rotate API keys периодично**
   ```bash
   # Генерирай нов key
   openssl rand -hex 32
   # Обнови .env
   # Рестартирай сървъра
   ```

3. **Използвай различни keys за dev/prod**
   ```env
   # Development
   ADMIN_API_KEY=7arts_dev_abc123...

   # Production
   ADMIN_API_KEY=7arts_prod_xyz789...
   ```

4. **Логвай admin actions**
   ```javascript
   console.log(`Admin ${req.adminUser} accessed vouchers`);
   ```

5. **Rate limiting** (за production)
   ```bash
   npm install express-rate-limit
   ```

### ❌ DON'T:

1. ❌ НЕ commit-вай API keys в git
2. ❌ НЕ споделяй API keys публично
3. ❌ НЕ използвай слаби пароли
4. ❌ НЕ изпращай API keys в URL parameters
5. ❌ НЕ логвай API keys в plain text

---

## 7. Troubleshooting

### ❌ Error: "Authentication required"

**Причина:** Липсва или невалиден auth header

**Решение:**
```bash
# Провери дали изпращаш правилния header
curl -v http://localhost:3001/api/admin/vouchers \
  -H "X-API-Key: YOUR_KEY"
```

### ❌ Error: "Invalid API key"

**Причина:** API key не съвпада с .env

**Решение:**
1. Провери `.env`:
   ```bash
   cat .env | grep ADMIN_API_KEY
   ```
2. Рестартирай сървъра:
   ```bash
   npm run dev
   ```

### ❌ Error: "Invalid credentials"

**Причина:** Username/Password грешни

**Решение:**
```bash
# Провери .env
cat .env | grep ADMIN_
```

---

Готово! Административният панел е настроен и защитен! 🔐
