import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VOUCHERS_FILE = path.join(__dirname, '../data/vouchers.json');

// In-memory storage
let vouchers = [];

/**
 * Инициализира storage от файл
 */
export async function initStorage() {
  try {
    const data = await fs.readFile(VOUCHERS_FILE, 'utf8');
    vouchers = JSON.parse(data);
    console.log(`✅ Loaded ${vouchers.length} vouchers from storage`);
  } catch (error) {
    // Файлът не съществува или е празен
    vouchers = [];
    await saveToFile();
    console.log('📝 Initialized empty voucher storage');
  }
}

/**
 * Записва vouchers във файл
 */
async function saveToFile() {
  try {
    await fs.writeFile(VOUCHERS_FILE, JSON.stringify(vouchers, null, 2));
  } catch (error) {
    console.error('❌ Error saving vouchers:', error);
  }
}

/**
 * Добавя нов ваучер
 */
export async function addVoucher(voucher) {
  vouchers.push(voucher);
  await saveToFile();
  return voucher;
}

/**
 * Намира ваучер по код
 */
export function findVoucherByCode(code) {
  return vouchers.find(v => v.code === code);
}

/**
 * Намира ваучер по Stripe session ID
 */
export function findVoucherBySessionId(sessionId) {
  return vouchers.find(v => v.stripeSessionId === sessionId);
}

/**
 * Получава всички ваучери
 */
export function getAllVouchers() {
  return vouchers;
}

/**
 * Маркира ваучер като използван
 */
export async function redeemVoucher(code) {
  const voucher = findVoucherByCode(code);
  if (!voucher) {
    throw new Error('Voucher not found');
  }
  if (voucher.status === 'redeemed') {
    throw new Error('Voucher already redeemed');
  }
  voucher.status = 'redeemed';
  voucher.redeemedAt = new Date().toISOString();
  await saveToFile();
  return voucher;
}
