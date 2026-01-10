import express from 'express';
import { handleStripeWebhook } from '../controllers/webhookController.js';

const router = express.Router();

/**
 * POST /api/webhook/stripe
 * Получава и обработва Stripe webhook events
 *
 * ВАЖНО: Този endpoint трябва да получава RAW body (не JSON parsed)
 * за да може да верифицира Stripe signature
 */
router.post('/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
