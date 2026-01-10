import Stripe from 'stripe';
import { generateVoucherCode, createVoucher } from '../utils/voucherGenerator.js';
import { addVoucher, findVoucherBySessionId } from '../utils/voucherStorage.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Обработва Stripe webhook events
 */
export async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Верифицира webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Обработва различни типове events
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object);
      break;

    case 'payment_intent.succeeded':
      console.log('💰 Payment succeeded:', event.data.object.id);
      break;

    case 'payment_intent.payment_failed':
      console.log('❌ Payment failed:', event.data.object.id);
      break;

    default:
      console.log(`ℹ️  Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
}

/**
 * Обработва успешно завършен checkout и генерира ваучер
 */
async function handleCheckoutSessionCompleted(session) {
  try {
    console.log('🎉 Checkout session completed:', session.id);

    // Проверка дали вече не е създаден ваучер за тази сесия
    const existingVoucher = findVoucherBySessionId(session.id);
    if (existingVoucher) {
      console.log('ℹ️  Voucher already exists for this session:', existingVoucher.code);
      return;
    }

    // Генерира уникален voucher код
    const voucherCode = generateVoucherCode();

    // Създава voucher обект
    const voucher = createVoucher(session, voucherCode);

    // Запазва ваучера
    await addVoucher(voucher);

    console.log('✅ Voucher created successfully:', {
      code: voucherCode,
      email: voucher.customerEmail,
      amount: voucher.amount,
      type: voucher.voucherType,
      format: voucher.voucherFormat
    });

    // 🔔 ТУК: Изпращане на email (stub за сега)
    await sendVoucherEmail(voucher);

  } catch (error) {
    console.error('❌ Error processing checkout session:', error);
    // В production: изпрати към error tracking service (Sentry, etc.)
  }
}

/**
 * Mock функция за изпращане на email с ваучер
 * TODO: Интегрирай с реален email service (SendGrid, Mailgun, etc.)
 */
async function sendVoucherEmail(voucher) {
  console.log('📧 [MOCK] Sending voucher email to:', voucher.customerEmail);
  console.log('📧 [MOCK] Email content:');
  console.log(`
    -----------------------------------
    Subject: Your 7Arts Gift Voucher

    Hello!

    Thank you for your purchase! Here is your gift voucher:

    Voucher Code: ${voucher.code}
    Amount: ${voucher.amount} ${voucher.currency}
    Type: ${voucher.voucherType}
    Format: ${voucher.voucherFormat}

    ${voucher.voucherFormat === 'digital'
      ? 'Your digital voucher is ready to use immediately!'
      : 'Your physical voucher will be shipped to you soon.'}

    Redeem at: https://vouchers.7arts.bg

    Best regards,
    7Arts Team
    -----------------------------------
  `);

  // TODO: Замени с реален email service
  // Example with SendGrid:
  // await sgMail.send({
  //   to: voucher.customerEmail,
  //   from: 'vouchers@7arts.bg',
  //   subject: 'Your 7Arts Gift Voucher',
  //   html: generateEmailHTML(voucher)
  // });
}
