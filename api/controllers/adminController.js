import {
  getAllVouchers,
  findVoucherByCode,
  findVoucherBySessionId
} from '../utils/voucherStorage.js';

/**
 * GET /api/admin/vouchers
 * Връща всички ваучери
 */
export function listAllVouchers(req, res) {
  try {
    const vouchers = getAllVouchers();

    // Статистики
    const stats = {
      total: vouchers.length,
      active: vouchers.filter(v => v.status === 'active').length,
      redeemed: vouchers.filter(v => v.status === 'redeemed').length,
      totalAmount: vouchers.reduce((sum, v) => sum + v.amount, 0),
      byCurrency: {},
      byType: {},
      byFormat: {}
    };

    // Групирай по валута
    vouchers.forEach(v => {
      stats.byCurrency[v.currency] = (stats.byCurrency[v.currency] || 0) + 1;
      stats.byType[v.voucherType] = (stats.byType[v.voucherType] || 0) + 1;
      stats.byFormat[v.voucherFormat] = (stats.byFormat[v.voucherFormat] || 0) + 1;
    });

    res.json({
      vouchers,
      stats
    });

  } catch (error) {
    console.error('❌ Error listing vouchers:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/admin/vouchers/:code
 * Връща конкретен ваучер по код
 */
export function getVoucherByCode(req, res) {
  try {
    const { code } = req.params;
    const voucher = findVoucherByCode(code);

    if (!voucher) {
      return res.status(404).json({ error: 'Voucher not found' });
    }

    res.json(voucher);

  } catch (error) {
    console.error('❌ Error getting voucher:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/admin/stats
 * Връща подробна статистика
 */
export function getStatistics(req, res) {
  try {
    const vouchers = getAllVouchers();

    const stats = {
      overview: {
        totalVouchers: vouchers.length,
        activeVouchers: vouchers.filter(v => v.status === 'active').length,
        redeemedVouchers: vouchers.filter(v => v.status === 'redeemed').length,
        totalValue: vouchers.reduce((sum, v) => sum + v.amount, 0),
        averageValue: vouchers.length > 0
          ? vouchers.reduce((sum, v) => sum + v.amount, 0) / vouchers.length
          : 0
      },
      byType: {
        individual: vouchers.filter(v => v.voucherType === 'individual').length,
        corporate: vouchers.filter(v => v.voucherType === 'corporate').length
      },
      byFormat: {
        digital: vouchers.filter(v => v.voucherFormat === 'digital').length,
        physical: vouchers.filter(v => v.voucherFormat === 'physical').length
      },
      byCurrency: {},
      recentVouchers: vouchers
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10)
        .map(v => ({
          code: v.code,
          amount: v.amount,
          status: v.status,
          createdAt: v.createdAt
        }))
    };

    // Групирай по валута
    vouchers.forEach(v => {
      if (!stats.byCurrency[v.currency]) {
        stats.byCurrency[v.currency] = {
          count: 0,
          totalValue: 0
        };
      }
      stats.byCurrency[v.currency].count++;
      stats.byCurrency[v.currency].totalValue += v.amount;
    });

    res.json(stats);

  } catch (error) {
    console.error('❌ Error getting stats:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/admin/search
 * Търси ваучери по различни критерии
 */
export function searchVouchers(req, res) {
  try {
    const { email, status, type, format, minAmount, maxAmount } = req.query;
    let vouchers = getAllVouchers();

    // Filter по email
    if (email) {
      vouchers = vouchers.filter(v =>
        v.customerEmail.toLowerCase().includes(email.toLowerCase())
      );
    }

    // Filter по status
    if (status) {
      vouchers = vouchers.filter(v => v.status === status);
    }

    // Filter по type
    if (type) {
      vouchers = vouchers.filter(v => v.voucherType === type);
    }

    // Filter по format
    if (format) {
      vouchers = vouchers.filter(v => v.voucherFormat === format);
    }

    // Filter по amount range
    if (minAmount) {
      vouchers = vouchers.filter(v => v.amount >= Number(minAmount));
    }
    if (maxAmount) {
      vouchers = vouchers.filter(v => v.amount <= Number(maxAmount));
    }

    res.json({
      count: vouchers.length,
      vouchers
    });

  } catch (error) {
    console.error('❌ Error searching vouchers:', error);
    res.status(500).json({ error: error.message });
  }
}
