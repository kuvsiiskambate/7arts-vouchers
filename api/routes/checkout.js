import express from 'express';
import { createCheckoutSession } from '../controllers/checkoutController.js';

const router = express.Router();

/**
 * POST /api/create-checkout-session
 * Създава Stripe checkout session за покупка на ваучер
 */
router.post('/create-checkout-session', createCheckoutSession);

export default router;
