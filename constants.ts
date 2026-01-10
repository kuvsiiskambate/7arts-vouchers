import { PricingTier, VoucherOption } from './types';

export const EURO_RATE = 1.95583;

export const VOUCHER_OPTIONS: VoucherOption[] = [
  {
    id: '6_MONTHS',
    title: '6-Месечен Абонамент',
    price: 49.99,
    description: 'Половин година достъп до магията на изкуството.',
    features: [
      'Неограничен достъп',
      'HD качество',
      'Гледане на 2 устройства',
      'Без реклами'
    ]
  },
  {
    id: '12_MONTHS',
    title: 'Едногодишен Абонамент',
    price: 109.99,
    description: 'Пълна година емоции с най-доброто от световната сцена.',
    features: [
      'Всички предимства на 6-месечния',
      'Включени заглавия под наем',
      'Ексклузивни премиери',
      'Най-изгодна цена'
    ]
  }
];

export const CORPORATE_DISCOUNTS: PricingTier[] = [
  { minQty: 2, discountPercent: 5, label: 'Старт (2-4 бр.)' },
  { minQty: 5, discountPercent: 10, label: 'Бизнес (5-9 бр.)' },
  { minQty: 10, discountPercent: 20, label: 'Корпоратив (10+ бр.)' },
];

export const PRODUCTION_FEE = 5; // BGN for physical card production/packaging
export const SHIPPING_FEE = 5; // BGN for delivery (waived for corporate)

// STRIPE CONFIGURATION
export const STRIPE_CONFIG = {
  // Provided Live Key
  publishableKey: 'pk_live_51M4lULCNpouRAFCMxpDgp9e4mSY618DsvQPczXN3ost8YenqrexPKaktAZABaY6HKXoeH9Ktc7bXDgTZuqYbcG2p00XUefzdkq', 
  // API Endpoint (Updated to match standard Stripe example path)
  apiEndpoint: 'http://localhost:4242/create-checkout-session'
};

// Map your internal Voucher IDs to Stripe Price IDs (Optional if using dynamic pricing)
export const STRIPE_PRICE_IDS = {
  '6_MONTHS': 'price_1234567890_six_months_placeholder', 
  '12_MONTHS': 'price_0987654321_twelve_months_placeholder',
};