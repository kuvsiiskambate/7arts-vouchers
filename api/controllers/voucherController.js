import {
  findVoucherByCode,
  redeemVoucher
} from '../utils/voucherStorage.js';

/**
 * POST /api/vouchers/validate
 * Проверява дали ваучер код е валиден (без да го използва)
 */
export async function validateVoucher(req, res) {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Voucher code is required' });
    }

    const voucher = findVoucherByCode(code.toUpperCase());

    if (!voucher) {
      return res.status(404).json({
        valid: false,
        error: 'Voucher not found',
        message: 'This voucher code does not exist'
      });
    }

    if (voucher.status === 'redeemed') {
      return res.json({
        valid: false,
        error: 'Voucher already used',
        message: 'This voucher has already been redeemed',
        redeemedAt: voucher.redeemedAt
      });
    }

    // Ваучерът е валиден
    res.json({
      valid: true,
      voucher: {
        code: voucher.code,
        amount: voucher.amount,
        currency: voucher.currency,
        voucherType: voucher.voucherType,
        voucherFormat: voucher.voucherFormat,
        status: voucher.status,
        createdAt: voucher.createdAt
      },
      message: 'Voucher is valid and ready to use'
    });

  } catch (error) {
    console.error('❌ Error validating voucher:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * POST /api/vouchers/redeem
 * Използва (redeem) ваучер
 */
export async function redeemVoucherEndpoint(req, res) {
  try {
    const { code, customerEmail } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Voucher code is required' });
    }

    // Първо валидирай
    const voucher = findVoucherByCode(code.toUpperCase());

    if (!voucher) {
      return res.status(404).json({
        success: false,
        error: 'Voucher not found'
      });
    }

    if (voucher.status === 'redeemed') {
      return res.status(400).json({
        success: false,
        error: 'Voucher already redeemed',
        redeemedAt: voucher.redeemedAt
      });
    }

    // Опционално: провери дали email-ът съвпада
    if (customerEmail && voucher.customerEmail !== customerEmail) {
      return res.status(403).json({
        success: false,
        error: 'Email does not match voucher owner'
      });
    }

    // Използвай ваучера
    const redeemedVoucher = await redeemVoucher(code.toUpperCase());

    console.log('✅ Voucher redeemed:', {
      code: redeemedVoucher.code,
      amount: redeemedVoucher.amount,
      email: redeemedVoucher.customerEmail
    });

    res.json({
      success: true,
      message: 'Voucher redeemed successfully',
      voucher: {
        code: redeemedVoucher.code,
        amount: redeemedVoucher.amount,
        currency: redeemedVoucher.currency,
        redeemedAt: redeemedVoucher.redeemedAt
      }
    });

  } catch (error) {
    console.error('❌ Error redeeming voucher:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * GET /api/vouchers/check/:code
 * Публичен endpoint за бърза проверка (само status)
 */
export function quickCheckVoucher(req, res) {
  try {
    const { code } = req.params;
    const voucher = findVoucherByCode(code.toUpperCase());

    if (!voucher) {
      return res.json({
        exists: false,
        valid: false
      });
    }

    res.json({
      exists: true,
      valid: voucher.status === 'active',
      status: voucher.status,
      amount: voucher.amount,
      currency: voucher.currency
    });

  } catch (error) {
    console.error('❌ Error checking voucher:', error);
    res.status(500).json({ error: error.message });
  }
}
