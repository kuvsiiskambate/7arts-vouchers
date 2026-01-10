import express from 'express';
import { adminAuth } from '../middleware/auth.js';
import {
  listAllVouchers,
  getVoucherByCode,
  getStatistics,
  searchVouchers
} from '../controllers/adminController.js';

const router = express.Router();

// Всички admin routes изискват authentication
router.use(adminAuth);

/**
 * GET /api/admin/vouchers
 * Списък с всички ваучери + статистики
 */
router.get('/vouchers', listAllVouchers);

/**
 * GET /api/admin/vouchers/:code
 * Детайли за конкретен ваучер
 */
router.get('/vouchers/:code', getVoucherByCode);

/**
 * GET /api/admin/stats
 * Подробна статистика
 */
router.get('/stats', getStatistics);

/**
 * GET /api/admin/search
 * Търсене на ваучери
 * Query params: email, status, type, format, minAmount, maxAmount
 */
router.get('/search', searchVouchers);

export default router;
