
import { OrderRecord } from '../types';

const DB_KEY = '7arts_orders_db';

export const mockBackend = {
  // Simulate saving to database
  saveOrder: (order: OrderRecord): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingData = localStorage.getItem(DB_KEY);
        const orders: OrderRecord[] = existingData ? JSON.parse(existingData) : [];
        orders.unshift(order); // Add new order to top
        localStorage.setItem(DB_KEY, JSON.stringify(orders));
        resolve();
      }, 500);
    });
  },

  // Simulate fetching all orders (Admin)
  getOrders: (): Promise<OrderRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingData = localStorage.getItem(DB_KEY);
        const orders: OrderRecord[] = existingData ? JSON.parse(existingData) : [];
        resolve(orders);
      }, 300);
    });
  },

  // Simulate updating status
  updateOrderStatus: (orderId: string, status: OrderRecord['status']): Promise<void> => {
    return new Promise((resolve) => {
      const existingData = localStorage.getItem(DB_KEY);
      if (existingData) {
        const orders: OrderRecord[] = JSON.parse(existingData);
        const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status } : o);
        localStorage.setItem(DB_KEY, JSON.stringify(updatedOrders));
      }
      resolve();
    });
  },

  // Simulate sending email via SMTP/SendGrid
  sendEmailNotification: (order: OrderRecord): Promise<void> => {
    return new Promise((resolve) => {
      console.log(`
      ----------------------------------------------------
      [MOCK EMAIL SERVER] Sending email to: info@7arts.bg
      Subject: Нова поръчка #${order.id} - ${order.totalAmount} лв.
      ----------------------------------------------------
      Клиент: ${order.customer.name}
      Email: ${order.customer.email}
      Телефон: ${order.customer.phone}
      
      Поръчка:
      - Тип: ${order.clientType}
      - Ваучер: ${order.duration}
      - Формат: ${order.format}
      - Количество: ${order.quantity}
      
      Адрес за доставка: ${order.format === 'PHYSICAL' ? order.customer.address : 'N/A'}
      Куриер: ${order.customer.courier || 'N/A'}
      
      Съобщение: ${order.customer.message || 'Няма'}
      ----------------------------------------------------
      `);
      resolve();
    });
  }
};
