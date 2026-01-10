
export type ClientType = 'INDIVIDUAL' | 'CORPORATE';

export type VoucherDuration = '6_MONTHS' | '12_MONTHS';

export type VoucherFormat = 'DIGITAL' | 'PHYSICAL';

export interface PricingTier {
  minQty: number;
  discountPercent: number;
  label: string;
}

export interface VoucherOption {
  id: VoucherDuration;
  title: string;
  price: number; // in BGN
  description: string;
  features: string[];
}

export interface OrderState {
  clientType: ClientType;
  duration: VoucherDuration;
  format: VoucherFormat;
  quantity: number;
}

// New Interface for the Saved Order in Database
export interface OrderRecord extends OrderState {
  id: string;
  date: string;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'COMPLETED';
  totalAmount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    companyName?: string;
    eik?: string;
    courier?: 'ECONT' | 'SPEEDY';
    message?: string;
  };
}
