import React, { useState, useEffect, useRef } from 'react';
import { Check, User, Building2, Minus, Plus, CreditCard, Mail, Truck, Zap, Trophy, TrendingUp, Lock, Info, Calendar, Box, Gift } from 'lucide-react';
import { VOUCHER_OPTIONS, CORPORATE_DISCOUNTS, SHIPPING_FEE, PRODUCTION_FEE, EURO_RATE } from '../constants';
import { OrderState, PricingTier } from '../types';

interface PricingCalculatorProps {
  order: OrderState;
  updateOrder: (updates: Partial<OrderState>) => void;
}

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef<number>(value);
  const reqRef = useRef<number>(0);

  useEffect(() => {
    // When target value changes, we start animating from the CURRENT displayValue
    startValueRef.current = displayValue;
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / 500, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      
      const current = startValueRef.current + (value - startValueRef.current) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        reqRef.current = requestAnimationFrame(animate);
      }
    };

    // Cancel any existing animation
    cancelAnimationFrame(reqRef.current);
    reqRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(reqRef.current);
  }, [value]);

  return (
    <span>
      <span aria-hidden="true">{displayValue.toFixed(2)}</span>
      <span className="sr-only">{value.toFixed(2)}</span>
    </span>
  );
};

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ order, updateOrder }) => {
  
  // Helper to find discount
  const getCurrentDiscount = (qty: number): PricingTier | undefined => {
    const applicableTiers = [...CORPORATE_DISCOUNTS]
      .sort((a, b) => b.minQty - a.minQty)
      .filter(tier => qty >= tier.minQty);
    
    return applicableTiers.length > 0 ? applicableTiers[0] : undefined;
  };

  const selectedVoucher = VOUCHER_OPTIONS.find(v => v.id === order.duration) || VOUCHER_OPTIONS[0];
  const discountTier = order.clientType === 'CORPORATE' ? getCurrentDiscount(order.quantity) : undefined;
  const nextTier = CORPORATE_DISCOUNTS.find(tier => tier.minQty > order.quantity);
  
  const basePrice = selectedVoucher.price;
  const discountAmount = discountTier ? (basePrice * (discountTier.discountPercent / 100)) : 0;
  const pricePerItem = basePrice - discountAmount;
  
  // Calculate Fees
  const isPhysical = order.format === 'PHYSICAL';
  // Production fee is per item
  const productionFee = isPhysical ? (PRODUCTION_FEE * order.quantity) : 0;
  
  // Shipping logic: Free for Corporate, Standard for Individual
  const shippingFee = (isPhysical && order.clientType === 'INDIVIDUAL') ? SHIPPING_FEE : 0;
  
  const subtotal = pricePerItem * order.quantity;
  const total = subtotal + productionFee + shippingFee;

  const toEur = (bgn: number) => (bgn / EURO_RATE).toFixed(2);

  // Calculate progress for visual bar (aligned to grid centers at ~17%, 50%, ~83%)
  const getProgressWidth = (qty: number) => {
    if (qty <= 2) return (qty / 2) * 17;
    if (qty <= 5) return 17 + ((qty - 2) / 3) * 33;
    if (qty <= 10) return 50 + ((qty - 5) / 5) * 33;
    return Math.min(100, 83 + ((qty - 10) / 5) * 17);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) {
      updateOrder({ quantity: val });
    }
  };

  return (
    <section id="pricing-section" className="py-8 lg:py-20 relative" aria-label="Калкулатор на цени">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-blue/10 to-brand-dark pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Client Type Toggle - Optimized for Mobile Thumb Reach */}
        <div className="flex justify-center mb-8 lg:mb-16">
          <div className="bg-white/5 p-1 rounded-xl sm:rounded-2xl flex relative border border-white/10 w-full sm:w-auto mx-auto shadow-lg" role="group" aria-label="Тип клиент">
            <button
              type="button"
              onClick={() => updateOrder({ clientType: 'INDIVIDUAL' })}
              aria-pressed={order.clientType === 'INDIVIDUAL'}
              className={`relative z-10 flex-1 sm:flex-none px-3 py-3 sm:px-10 text-xs sm:text-base rounded-lg sm:rounded-xl font-bold flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-brand-dark whitespace-nowrap ${
                order.clientType === 'INDIVIDUAL' 
                  ? 'bg-brand-neon text-brand-dark shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" aria-hidden="true" />
              Индивидуален
            </button>
            <button
              type="button"
              onClick={() => updateOrder({ clientType: 'CORPORATE' })}
              aria-pressed={order.clientType === 'CORPORATE'}
              className={`relative z-10 flex-1 sm:flex-none px-3 py-3 sm:px-10 text-xs sm:text-base rounded-lg sm:rounded-xl font-bold flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-brand-dark whitespace-nowrap ${
                order.clientType === 'CORPORATE' 
                  ? 'bg-brand-neon text-brand-dark shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" aria-hidden="true" />
              Корпоративен
            </button>
          </div>
        </div>

        {/* Corporate Banner Info */}
        {order.clientType === 'CORPORATE' && (
          <div className="mb-8 lg:mb-12 max-w-4xl mx-auto bg-brand-blue/20 border border-brand-neon/30 p-4 sm:p-6 rounded-2xl text-center relative overflow-hidden animate-fade-in">
             <div className="absolute top-0 left-0 w-1 h-full bg-brand-neon" aria-hidden="true"></div>
             <h3 className="text-sm sm:text-xl font-bold text-brand-neon mb-2 flex items-center justify-center">
               <Zap className="mr-2" size={18} fill="currentColor" aria-hidden="true" />
               Корпоративни Предимства
             </h3>
             <p className="text-xs sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
               Вземете преференциални цени за вашите служители или партньори. Безплатна доставка на физически ваучери и фактура по ДДС.
             </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Plan Selection */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">1. Изберете Ваучер</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" role="radiogroup" aria-label="Продължителност на ваучера">
                {VOUCHER_OPTIONS.map((option) => (
                  <button 
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={order.duration === option.id}
                    onClick={() => updateOrder({ duration: option.id })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        updateOrder({ duration: option.id });
                      }
                    }}
                    className={`w-full text-left cursor-pointer group relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 glass-card focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-brand-dark active:scale-[0.98] ${
                      order.duration === option.id 
                        ? 'border-brand-neon bg-brand-blue/30 shadow-[0_0_20px_rgba(0,229,255,0.1)]' 
                        : 'border-white/5 hover:border-brand-neon/50'
                    }`}
                  >
                    {option.id === '12_MONTHS' && (
                      <div className="absolute -top-3 right-4 bg-brand-neon text-brand-dark text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Препоръчан
                      </div>
                    )}
                    
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{option.title}</h3>
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {option.price} <span className="text-sm font-normal text-gray-400">лв.</span>
                    </div>
                    <div className="text-sm text-brand-neon mb-4 font-mono">
                      ~ €{toEur(option.price)}
                    </div>

                    <p className="text-gray-400 text-sm mb-4 sm:mb-5 h-auto md:h-12 leading-relaxed">{option.description}</p>
                    
                    <ul className="space-y-2 sm:space-y-3">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-300">
                          <div className="bg-brand-neon/10 p-1 rounded-full mr-3 text-brand-neon flex-shrink-0" aria-hidden="true">
                            <Check size={10} strokeWidth={3} className="sm:w-3 sm:h-3" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className={`absolute inset-0 border-2 border-brand-neon rounded-2xl opacity-0 scale-95 transition-all duration-300 pointer-events-none ${
                      order.duration === option.id ? 'opacity-100 scale-100' : ''
                    }`} aria-hidden="true"></div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">2. Формат и Количество</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                {/* Format Selection */}
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-300">Формат на ваучера:</h3>
                  <div className="flex flex-col space-y-3" role="radiogroup" aria-label="Формат на ваучера">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={order.format === 'DIGITAL'}
                      onClick={() => updateOrder({ format: 'DIGITAL' })}
                      className={`w-full flex items-center p-3 sm:p-4 rounded-xl border transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-brand-dark ${
                        order.format === 'DIGITAL'
                          ? 'border-brand-neon bg-brand-neon/10 text-white shadow-[0_0_10px_rgba(0,229,255,0.1)]'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-brand-neon flex-shrink-0" aria-hidden="true" />
                      <div className="text-left">
                        <div className="font-bold text-sm sm:text-base">Дигитален (Email)</div>
                        <div className="text-xs opacity-70">Получавате веднага</div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      role="radio"
                      aria-checked={order.format === 'PHYSICAL'}
                      onClick={() => updateOrder({ format: 'PHYSICAL' })}
                      className={`w-full flex items-center p-3 sm:p-4 rounded-xl border transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-brand-dark ${
                        order.format === 'PHYSICAL'
                          ? 'border-brand-neon bg-brand-neon/10 text-white shadow-[0_0_10px_rgba(0,229,255,0.1)]'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="relative flex-shrink-0" aria-hidden="true">
                         <Truck className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-brand-neon" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm sm:text-base">Хартиен (Еконт/Спиди)</div>
                        <div className="text-xs opacity-70">Луксозна картичка + плик</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Quantity Selection - Larger touch targets for mobile */}
                <div className="space-y-3">
                   <h3 className="text-sm sm:text-lg font-semibold text-gray-300" id="quantity-label">
                     {order.clientType === 'CORPORATE' ? 'Брой служители/партньори:' : 'Брой ваучери:'}
                   </h3>
                   
                   <div className="flex flex-col space-y-3">
                     <div className="flex items-center space-x-3 sm:space-x-4">
                       <button 
                        type="button"
                        aria-label="Намали количеството"
                        aria-controls="quantity-input"
                        onClick={() => updateOrder({ quantity: Math.max(order.clientType === 'CORPORATE' ? 2 : 1, order.quantity - 1) })}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all transform active:scale-90 hover:text-brand-neon focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-brand-dark active:bg-brand-neon/10 active:shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                       >
                         <Minus size={20} className="sm:w-6 sm:h-6" aria-hidden="true" />
                       </button>
                       
                       <div className="flex-1 relative">
                          <label htmlFor="quantity-input" className="sr-only">
                             {order.clientType === 'CORPORATE' ? 'Брой служители или партньори' : 'Брой ваучери'}
                          </label>
                          <input 
                            id="quantity-input"
                            type="number"
                            min={order.clientType === 'CORPORATE' ? 2 : 1}
                            value={order.quantity}
                            onChange={handleQuantityChange}
                            aria-labelledby="quantity-label"
                            className="w-full h-12 sm:h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl sm:text-2xl font-bold font-mono focus:border-brand-neon focus:ring-2 focus:ring-brand-neon focus:outline-none transition-all"
                          />
                       </div>

                       <button 
                        type="button"
                        aria-label="Увеличи количеството"
                        aria-controls="quantity-input"
                        onClick={() => updateOrder({ quantity: order.quantity + 1 })}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-brand-neon hover:bg-brand-neonHover text-brand-dark flex items-center justify-center transition-all transform active:scale-90 shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-brand-dark active:shadow-[0_0_30px_rgba(0,229,255,0.6)]"
                       >
                         <Plus size={20} className="sm:w-6 sm:h-6" aria-hidden="true" />
                       </button>
                     </div>

                     {order.clientType === 'CORPORATE' && (
                        <div className="flex space-x-2 mt-2">
                           <button 
                              type="button"
                              onClick={() => updateOrder({ quantity: order.quantity + 10 })} 
                              className="flex-1 bg-white/5 hover:bg-white/10 text-xs sm:text-sm py-3 rounded-lg text-gray-300 hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 active:bg-brand-neon/20 active:text-brand-neon active:shadow-[0_0_15px_rgba(0,229,255,0.2)] focus:outline-none focus:ring-1 focus:ring-brand-neon border border-transparent hover:border-brand-neon/20"
                           >
                              +10 бр.
                           </button>
                           <button 
                              type="button"
                              onClick={() => updateOrder({ quantity: order.quantity + 50 })} 
                              className="flex-1 bg-white/5 hover:bg-white/10 text-xs sm:text-sm py-3 rounded-lg text-gray-300 hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 active:bg-brand-neon/20 active:text-brand-neon active:shadow-[0_0_15px_rgba(0,229,255,0.2)] focus:outline-none focus:ring-1 focus:ring-brand-neon border border-transparent hover:border-brand-neon/20"
                           >
                              +50 бр.
                           </button>
                        </div>
                     )}
                   </div>
                    
                    {/* Enhanced Corporate Discount Visualizer */}
                   {order.clientType === 'CORPORATE' && (
                     <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10" role="region" aria-label="Прогрес на отстъпката">
                        <div className="flex items-center justify-between mb-4">
                           <div className="text-xs sm:text-sm text-gray-300 flex items-center relative">
                             <TrendingUp size={14} className="mr-1.5 sm:mr-2 text-brand-neon" aria-hidden="true" />
                             Прогрес на отстъпката
                             <div className="relative group ml-2 cursor-help">
                                <Info size={14} className="text-gray-400 hover:text-white transition-colors" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 sm:w-64 p-3 bg-brand-dark border border-white/10 rounded-lg shadow-xl text-xs text-gray-300 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                                   <div className="font-bold text-white mb-1">Как работи отстъпката?</div>
                                   Отстъпката се начислява автоматично на база количеството ваучери. 2-4 бр: 5%, 5-9 бр: 10%, 10+ бр: 20%.
                                   <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-dark border-b border-r border-white/10 rotate-45"></div>
                                </div>
                             </div>
                           </div>
                           {nextTier ? (
                             <div className="text-[10px] sm:text-xs text-brand-neon">
                               Още <span className="font-bold">{nextTier.minQty - order.quantity}</span> бр. до {nextTier.discountPercent}%
                             </div>
                           ) : (
                             <div className="text-[10px] sm:text-xs text-brand-neon font-bold flex items-center">
                               <Trophy size={12} className="mr-1" aria-hidden="true" /> Макс. ниво
                             </div>
                           )}
                        </div>

                        {/* Tier Steps Visual */}
                        <div 
                           className="relative mb-6 pb-2"
                           role="progressbar"
                           aria-valuenow={order.quantity}
                           aria-valuemin={0}
                           aria-valuemax={15}
                           aria-label="Ниво на отстъпка"
                        >
                           <div className="absolute top-4 left-[16%] right-[16%] h-1 bg-white/10 rounded z-0" aria-hidden="true"></div>
                           
                            <div 
                              className="absolute top-4 left-0 h-1 bg-brand-neon rounded z-0 transition-all duration-500 shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                              style={{ width: `${getProgressWidth(order.quantity)}%` }}
                              aria-hidden="true"
                            ></div>
                            
                           <div className="grid grid-cols-3 gap-2 relative z-10" aria-hidden="true">
                             {CORPORATE_DISCOUNTS.map((tier, idx) => {
                               const isAchieved = order.quantity >= tier.minQty;
                               const isCurrent = getCurrentDiscount(order.quantity) === tier;
                               
                               return (
                                 <div key={idx} className="flex flex-col items-center">
                                   <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 mb-2 transition-all duration-300 ${
                                     isAchieved 
                                       ? 'bg-brand-neon border-brand-neon text-brand-dark scale-110 shadow-[0_0_15px_rgba(0,229,255,0.5)]' 
                                       : 'bg-brand-dark border-gray-600 text-gray-500'
                                   }`}>
                                     -{tier.discountPercent}%
                                   </div>
                                   <div className={`text-[9px] sm:text-[10px] text-center font-medium transition-colors ${
                                     isAchieved ? 'text-white' : 'text-gray-600'
                                   }`}>
                                     над {tier.minQty} бр.
                                   </div>
                                    <div className={`text-[9px] sm:text-[10px] text-center font-medium mt-0.5 ${
                                      isCurrent ? 'text-brand-neon' : 'text-transparent'
                                    }`}>
                                      (Текущо)
                                    </div>
                                 </div>
                               );
                             })}
                           </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs sm:text-sm border-t border-white/5 pt-3">
                           <span className="text-gray-400">Цена с отстъпка:</span>
                           <span className="text-white font-bold text-base sm:text-lg"><AnimatedNumber value={pricePerItem} /> лв.</span>
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary (Sticky) - Optimized for Mobile Reading */}
          <div className="lg:col-span-5 mt-4 lg:mt-0">
            <div className="lg:sticky lg:top-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none" aria-hidden="true">
                 <CreditCard size={100} className="sm:w-[120px] sm:h-[120px]" />
              </div>

              <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center relative z-10">
                Вашата Поръчка
              </h3>
              
              <div className="space-y-4 mb-6 sm:mb-8 relative z-10">
                {/* Visual Selection Summary Block with Integrated Price */}
                <div className="bg-brand-blue/20 border border-brand-neon/20 rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-white"><Gift size={80} /></div>
                    
                    <div className="flex justify-between items-start relative z-10">
                        <div className="flex items-start">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex flex-col items-center justify-center font-bold mr-3 sm:mr-4 shadow-lg bg-gradient-to-br from-brand-neon to-brand-blue text-brand-dark flex-shrink-0">
                                <span className="text-base sm:text-lg leading-none">{order.duration === '12_MONTHS' ? '12' : '6'}</span>
                                <span className="text-[8px] sm:text-[9px] uppercase leading-none mt-0.5">мес.</span>
                            </div>
                            <div>
                                <div className="font-bold text-white leading-tight text-sm sm:text-base mb-1">{selectedVoucher.title}</div>
                                <div className="text-xs text-gray-300 flex items-center bg-brand-dark/30 rounded px-2 py-1 w-fit mt-1">
                                   {order.format === 'DIGITAL' 
                                     ? <><Mail size={12} className="mr-1.5 text-brand-neon"/> Дигитален</>
                                     : <><Truck size={12} className="mr-1.5 text-brand-neon"/> Физически</>
                                   }
                                   <span className="mx-2 opacity-30">|</span>
                                   <span>x{order.quantity}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-end">
                       <span className="text-xs sm:text-sm text-gray-400">Обща стойност:</span>
                       <div className="text-right">
                          <span className="text-xl sm:text-2xl font-bold text-white block leading-none">
                            <AnimatedNumber value={total} /> <span className="text-sm text-gray-500 font-normal">лв.</span>
                          </span>
                          <span className="text-[10px] sm:text-xs text-brand-neon font-mono">
                            ~ €<AnimatedNumber value={total / EURO_RATE} />
                          </span>
                       </div>
                    </div>
                </div>

                {/* Detailed Breakdown with legible font sizes */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center text-sm sm:text-base text-gray-300">
                    <span className="flex items-center"><Calendar size={14} className="mr-2 opacity-70 sm:w-4 sm:h-4" /> Валидност:</span>
                    <span className="font-semibold text-white">{selectedVoucher.title.includes('6') ? '6 Месеца' : '1 Година'}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm sm:text-base text-gray-300">
                    <span className="flex items-center"><Box size={14} className="mr-2 opacity-70 sm:w-4 sm:h-4" /> Формат:</span>
                    <span className="font-semibold text-white">{order.format === 'DIGITAL' ? 'Дигитален' : 'Физически'}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm sm:text-base text-gray-300">
                    <span className="flex items-center"><User size={14} className="mr-2 opacity-70 sm:w-4 sm:h-4" /> Тип клиент:</span>
                    <span className="font-semibold text-white">{order.clientType === 'CORPORATE' ? 'Корпоративен' : 'Индивидуален'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm sm:text-base text-gray-300 pt-2 border-t border-white/5">
                    <span>Ед. цена:</span>
                    <div className="text-right">
                      <span className="font-semibold text-white block"><AnimatedNumber value={basePrice} /> лв.</span>
                      <span className="text-[10px] sm:text-xs text-gray-500 block">~ €{toEur(basePrice)}</span>
                    </div>
                  </div>
                  
                  {discountTier && (
                    <div className="flex justify-between items-center text-brand-neon bg-brand-neon/10 p-2 rounded border border-brand-neon/20 text-xs sm:text-sm sm:text-base">
                      <span>Отстъпка ({discountTier.label}):</span>
                      <span className="font-bold">-<AnimatedNumber value={discountAmount} /> лв./бр.</span>
                    </div>
                  )}

                  {/* Additional Fees */}
                  {isPhysical && (
                    <>
                       <div className="h-px bg-white/10 my-2" aria-hidden="true"></div>
                       <div className="flex justify-between items-center text-sm sm:text-base text-gray-300">
                        <span className="flex items-center"><Zap size={14} className="mr-2 opacity-70 sm:w-4 sm:h-4" aria-hidden="true"/> Изработка:</span>
                        <div className="text-right">
                           <span className="font-semibold text-white"><AnimatedNumber value={productionFee} /> лв.</span>
                           {order.quantity > 1 && (
                              <div className="text-[10px] sm:text-xs text-gray-400">5.00 лв. / бр.</div>
                           )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm sm:text-base text-gray-300">
                        <span className="flex items-center"><Truck size={14} className="mr-2 opacity-70 sm:w-4 sm:h-4" aria-hidden="true"/> Доставка:</span>
                        {order.clientType === 'CORPORATE' ? (
                          <span className="font-semibold text-brand-neon">Безплатна</span>
                        ) : (
                          <span className="font-semibold text-white"><AnimatedNumber value={shippingFee} /> лв.</span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="h-px bg-white/10 my-4 sm:my-6" aria-hidden="true"></div>

                <div className="flex flex-col items-end">
                  <span className="text-xs sm:text-sm text-gray-400 mb-1">Тотал за плащане онлайн:</span>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-bold text-white"><AnimatedNumber value={total} /></span>
                    <span className="text-gray-400 ml-1 text-base sm:text-lg">лв.</span>
                  </div>
                  <div className="text-right text-brand-neon font-mono mt-1 text-sm sm:text-lg">
                    ~ €<AnimatedNumber value={total / EURO_RATE} />
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-2">с включен ДДС</div>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth'})}
                className="w-full relative overflow-hidden bg-brand-neon hover:bg-brand-neonHover text-brand-dark font-bold py-3 sm:py-4 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98] z-10 group focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                <span className="relative z-10 flex items-center justify-center text-base sm:text-lg">
                  <CreditCard className="mr-2" size={20} /> 
                  Към плащане
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" aria-hidden="true"></div>
              </button>
              
              <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-4 relative z-10 flex items-center justify-center">
                <Lock size={10} className="mr-1 sm:w-3 sm:h-3" />
                Сигурно плащане със Stripe
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;