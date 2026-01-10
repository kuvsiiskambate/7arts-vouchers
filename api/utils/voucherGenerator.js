/**
 * Генерира уникален ваучер код във формат 7ARTS-XXXX-XXXX
 */
export function generateVoucherCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const generateSegment = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const segment1 = generateSegment(4);
  const segment2 = generateSegment(4);

  return `7ARTS-${segment1}-${segment2}`;
}

/**
 * Създава voucher обект с всички необходими данни
 */
export function createVoucher(sessionData, code) {
  return {
    code,
    amount: sessionData.amount_total / 100, // От cents в основна валута
    currency: sessionData.currency.toUpperCase(),
    voucherType: sessionData.metadata.voucherType,
    voucherFormat: sessionData.metadata.voucherFormat,
    customerEmail: sessionData.customer_details?.email || sessionData.metadata.customerEmail,
    status: 'active',
    createdAt: new Date().toISOString(),
    stripeSessionId: sessionData.id,
    paymentStatus: sessionData.payment_status
  };
}
