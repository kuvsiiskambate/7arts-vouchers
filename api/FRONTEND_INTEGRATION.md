# Frontend Integration Guide 🔗

Как да интегрираш frontend-а с 7Arts Vouchers API.

---

## 🎯 API Base URL

```javascript
// Development
const API_URL = 'http://localhost:3001';

// Production
const API_URL = 'https://api.vouchers.7arts.bg';
```

---

## 💳 Stripe Checkout Integration

### Пълен React Example

```jsx
import { useState } from 'react';

function VoucherPurchaseForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePurchase = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: formData.amount,
          currency: 'bgn',
          quantity: 1,
          voucherType: formData.voucherType, // 'individual' | 'corporate'
          voucherFormat: formData.voucherFormat, // 'digital' | 'physical'
          customerEmail: formData.email
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      // Redirect към Stripe Checkout
      window.location.href = url;

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      handlePurchase({
        amount: Number(formData.get('amount')),
        voucherType: formData.get('voucherType'),
        voucherFormat: formData.get('voucherFormat'),
        email: formData.get('email')
      });
    }}>
      <input
        type="number"
        name="amount"
        placeholder="Amount (BGN)"
        min="10"
        required
      />

      <select name="voucherType" required>
        <option value="">Select Type</option>
        <option value="individual">Individual</option>
        <option value="corporate">Corporate</option>
      </select>

      <select name="voucherFormat" required>
        <option value="">Select Format</option>
        <option value="digital">Digital</option>
        <option value="physical">Physical</option>
      </select>

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Purchase Voucher'}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default VoucherPurchaseForm;
```

---

## 🎨 Preset Amount Buttons

```jsx
function VoucherAmountSelector({ onSelect }) {
  const presetAmounts = [50, 100, 150, 200, 300];

  return (
    <div className="amount-selector">
      <h3>Choose Amount</h3>
      <div className="amount-buttons">
        {presetAmounts.map(amount => (
          <button
            key={amount}
            onClick={() => onSelect(amount)}
            className="amount-btn"
          >
            {amount} BGN
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## ✅ Success Page

След успешно плащане, Stripe redirect-ва към:
```
https://vouchers.7arts.bg/success?session_id=cs_test_...
```

Създай Success page:

```jsx
// src/pages/Success.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // Опционално: Провери статуса на session-а
      console.log('Payment successful! Session ID:', sessionId);
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="success-page">
      <h1>🎉 Thank You!</h1>
      <p>Your voucher has been purchased successfully!</p>
      <p>Check your email for the voucher code.</p>

      <div className="success-info">
        <p>An email has been sent to you with:</p>
        <ul>
          <li>✅ Your unique voucher code</li>
          <li>✅ Redemption instructions</li>
          <li>✅ Purchase receipt</li>
        </ul>
      </div>

      <a href="/" className="btn-primary">
        Return to Home
      </a>
    </div>
  );
}

export default SuccessPage;
```

---

## ❌ Cancel Page

Stripe redirect-ва към `/cancel` ако клиентът откаже:

```jsx
// src/pages/Cancel.jsx
function CancelPage() {
  return (
    <div className="cancel-page">
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. No charges were made.</p>

      <a href="/" className="btn-primary">
        Try Again
      </a>
    </div>
  );
}

export default CancelPage;
```

---

## 🛣️ React Router Setup

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import SuccessPage from './pages/Success';
import CancelPage from './pages/Cancel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 🔄 Complete Flow Example

```jsx
// src/components/VoucherFlow.jsx
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function VoucherFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: 100,
    voucherType: 'individual',
    voucherFormat: 'digital',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Step 1: Amount Selection
  const AmountStep = () => (
    <div className="step">
      <h2>Select Amount</h2>
      <div className="amount-grid">
        {[50, 100, 150, 200, 300].map(amount => (
          <button
            key={amount}
            onClick={() => {
              setFormData({ ...formData, amount });
              setStep(2);
            }}
            className={formData.amount === amount ? 'selected' : ''}
          >
            {amount} BGN
          </button>
        ))}
      </div>
      <input
        type="number"
        placeholder="Custom amount"
        min="10"
        onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
      />
    </div>
  );

  // Step 2: Type Selection
  const TypeStep = () => (
    <div className="step">
      <h2>Voucher Type</h2>
      <div className="type-selection">
        <button
          onClick={() => {
            setFormData({ ...formData, voucherType: 'individual' });
            setStep(3);
          }}
          className={formData.voucherType === 'individual' ? 'selected' : ''}
        >
          <h3>Individual</h3>
          <p>Perfect for personal gifts</p>
        </button>
        <button
          onClick={() => {
            setFormData({ ...formData, voucherType: 'corporate' });
            setStep(3);
          }}
          className={formData.voucherType === 'corporate' ? 'selected' : ''}
        >
          <h3>Corporate</h3>
          <p>Great for business gifts</p>
        </button>
      </div>
    </div>
  );

  // Step 3: Format Selection
  const FormatStep = () => (
    <div className="step">
      <h2>Delivery Format</h2>
      <div className="format-selection">
        <button
          onClick={() => {
            setFormData({ ...formData, voucherFormat: 'digital' });
            setStep(4);
          }}
          className={formData.voucherFormat === 'digital' ? 'selected' : ''}
        >
          <h3>📧 Digital</h3>
          <p>Instant email delivery</p>
        </button>
        <button
          onClick={() => {
            setFormData({ ...formData, voucherFormat: 'physical' });
            setStep(4);
          }}
          className={formData.voucherFormat === 'physical' ? 'selected' : ''}
        >
          <h3>📦 Physical</h3>
          <p>Shipped to your address</p>
        </button>
      </div>
    </div>
  );

  // Step 4: Email & Checkout
  const CheckoutStep = () => (
    <div className="step">
      <h2>Final Step</h2>
      <div className="summary">
        <h3>Order Summary</h3>
        <p>Amount: {formData.amount} BGN</p>
        <p>Type: {formData.voucherType}</p>
        <p>Format: {formData.voucherFormat}</p>
      </div>

      <input
        type="email"
        placeholder="Your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <button
        onClick={handleCheckout}
        disabled={loading || !formData.email}
        className="checkout-btn"
      >
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>

      {error && <div className="error">{error}</div>}
    </div>
  );

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="voucher-flow">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 4) * 100}%` }}></div>
      </div>

      {step === 1 && <AmountStep />}
      {step === 2 && <TypeStep />}
      {step === 3 && <FormatStep />}
      {step === 4 && <CheckoutStep />}

      {step > 1 && (
        <button onClick={() => setStep(step - 1)} className="back-btn">
          ← Back
        </button>
      )}
    </div>
  );
}

export default VoucherFlow;
```

---

## 🔐 Environment Variables (Frontend)

Създай `.env` във frontend проекта:

```env
# .env
VITE_API_URL=http://localhost:3001

# Production
# VITE_API_URL=https://api.vouchers.7arts.bg
```

Използвай в кода:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## 📱 Mobile Responsive

```css
/* Пример CSS за mobile-friendly форма */
.voucher-flow {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.amount-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  margin: 20px 0;
}

.amount-grid button {
  padding: 20px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.amount-grid button:hover,
.amount-grid button.selected {
  border-color: #007bff;
  background-color: #007bff;
  color: white;
}

@media (max-width: 768px) {
  .amount-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## 🚨 Error Handling

```javascript
async function createCheckoutSession(voucherData) {
  try {
    const response = await fetch(`${API_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voucherData)
    });

    // Проверка за HTTP errors
    if (!response.ok) {
      const errorData = await response.json();

      // Специфични error messages
      switch (response.status) {
        case 400:
          throw new Error(errorData.error || 'Invalid input. Please check your data.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error('Something went wrong. Please try again.');
      }
    }

    return await response.json();

  } catch (error) {
    // Network errors
    if (error instanceof TypeError) {
      throw new Error('Network error. Please check your connection.');
    }

    throw error;
  }
}
```

---

## 🎨 Loading States

```jsx
function PurchaseButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`purchase-btn ${loading ? 'loading' : ''}`}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Processing...
        </>
      ) : (
        'Purchase Voucher'
      )}
    </button>
  );
}
```

---

## 🧪 Testing

```javascript
// Test data
const testVoucherData = {
  amount: 100,
  currency: 'bgn',
  quantity: 1,
  voucherType: 'individual',
  voucherFormat: 'digital',
  customerEmail: 'test@example.com'
};

// Console test
fetch('http://localhost:3001/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testVoucherData)
})
  .then(res => res.json())
  .then(data => console.log('Checkout URL:', data.url))
  .catch(err => console.error('Error:', err));
```

---

## ✅ Checklist за Production

- [ ] Смени API_URL към production URL
- [ ] Тествай checkout flow със Stripe test cards
- [ ] Провери success/cancel redirect URLs
- [ ] Добави Google Analytics tracking
- [ ] Имплементирай error tracking (Sentry)
- [ ] Оптимизирай images
- [ ] Добави loading states
- [ ] Тествай на мобилни устройства
- [ ] SEO optimization

---

Готово! Frontend-ът е готов за интеграция с API-то. 🚀
