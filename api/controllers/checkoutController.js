import Stripe from 'stripe';

// Lazy initialization на Stripe
let stripe = null;
function getStripe() {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured. Please add it to your .env file.');
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

/**
 * Създава Stripe Checkout Session за покупка на ваучер
 */
export async function createCheckoutSession(req, res) {
  try {
    // Проверка за Stripe configuration
    const stripe = getStripe();
    const {
      amount,
      currency = 'bgn',
      quantity = 1,
      voucherType,
      voucherFormat,
      customerEmail
    } = req.body;

    // Валидация
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!voucherType || !['individual', 'corporate'].includes(voucherType)) {
      return res.status(400).json({ error: 'Invalid voucher type. Use: individual or corporate' });
    }

    if (!voucherFormat || !['digital', 'physical'].includes(voucherFormat)) {
      return res.status(400).json({ error: 'Invalid voucher format. Use: digital or physical' });
    }

    if (!customerEmail || !customerEmail.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Създаване на Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `7Arts ${voucherType === 'individual' ? 'Individual' : 'Corporate'} Gift Voucher`,
              description: `${voucherFormat === 'digital' ? 'Digital' : 'Physical'} voucher - ${amount} ${currency.toUpperCase()}`,
              images: ['https://vouchers.7arts.bg/logo.png'], // Опционално лого
            },
            unit_amount: Math.round(amount * 100), // Конвертира в cents
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      customer_email: customerEmail,
      metadata: {
        voucherType,
        voucherFormat,
        customerEmail,
        amount: amount.toString(),
        currency: currency.toUpperCase(),
      },
    });

    console.log(`✅ Checkout session created: ${session.id}`);

    res.json({ url: session.url });
  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
}
