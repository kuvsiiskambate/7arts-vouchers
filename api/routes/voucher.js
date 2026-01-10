import express from 'express';
import {
  validateVoucher,
  redeemVoucherEndpoint,
  quickCheckVoucher
} from '../controllers/voucherController.js';

const router = express.Router();

/**
 * POST /api/vouchers/validate
 * Проверява дали ваучер е валиден (без да го използва)
 */
router.post('/validate', validateVoucher);

/**
 * POST /api/vouchers/redeem
 * Използва (redeem) ваучер
 */
router.post('/redeem', redeemVoucherEndpoint);

/**
 * GET /api/vouchers/check/:code
 * Бърза проверка на ваучер (публичен endpoint)
 */
router.get('/check/:code', quickCheckVoucher);

export default router;
