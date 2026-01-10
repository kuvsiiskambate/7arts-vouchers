import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import checkoutRoutes from './routes/checkout.js';
import webhookRoutes from './routes/webhook.js';
import adminRoutes from './routes/admin.js';
import voucherRoutes from './routes/voucher.js';
import { initStorage } from './utils/voucherStorage.js';

// Зарежда environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS конфигурация
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

// ⚠️ ВАЖНО: Webhook route трябва да е ПРЕДИ express.json() middleware
// защото Stripe изисква raw body за signature verification
app.use('/api/webhook', webhookRoutes);

// JSON body parser за останалите routes
app.use(express.json());

// API Routes
app.use('/api', checkoutRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vouchers', voucherRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: '7Arts Vouchers API',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '7Arts Vouchers API',
    version: '1.0.0',
    endpoints: {
      public: {
        createCheckout: 'POST /api/create-checkout-session',
        validateVoucher: 'POST /api/vouchers/validate',
        redeemVoucher: 'POST /api/vouchers/redeem',
        checkVoucher: 'GET /api/vouchers/check/:code',
        health: 'GET /health'
      },
      admin: {
        listVouchers: 'GET /api/admin/vouchers (requires auth)',
        getVoucher: 'GET /api/admin/vouchers/:code (requires auth)',
        statistics: 'GET /api/admin/stats (requires auth)',
        search: 'GET /api/admin/search (requires auth)'
      },
      webhook: {
        stripe: 'POST /api/webhook/stripe'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Стартира сървъра
async function startServer() {
  try {
    // Инициализира voucher storage
    await initStorage();

    app.listen(PORT, () => {
      console.log('');
      console.log('🚀 7Arts Vouchers API Server');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📍 Server: http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Client URL: ${process.env.CLIENT_URL || 'not configured'}`);
      console.log(`💳 Stripe: ${process.env.STRIPE_SECRET_KEY ? '✅ configured' : '❌ not configured'}`);
      console.log(`🔐 Admin Auth: ${process.env.ADMIN_USERNAME || process.env.ADMIN_API_KEY ? '✅ configured' : '⚠️  not configured'}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
