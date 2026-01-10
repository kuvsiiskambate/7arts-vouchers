import React from 'react';
import { Gift } from 'lucide-react';
import { VoucherDuration } from '../types';

export interface VoucherTheme {
  background: string;
  border: string;
  textAccent: string;
  textColor?: string;
  iconColor: string;
}

interface VoucherCardFaceProps {
  type: VoucherDuration;
  className?: string;
  theme?: VoucherTheme;
}

const VoucherCardFace: React.FC<VoucherCardFaceProps> = ({ type, className = "", theme }) => {
  
  // Default themes based on type if no theme prop is provided
  const defaultTheme: VoucherTheme = type === '12_MONTHS' 
    ? {
        background: 'bg-gradient-to-br from-brand-blue via-[#0c2461] to-brand-dark',
        border: 'border border-brand-neon/30',
        textAccent: 'text-brand-neon',
        textColor: 'text-white',
        iconColor: 'text-brand-neon drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]'
      }
    : {
        background: 'bg-gradient-to-br from-brand-neon/20 via-brand-blue to-brand-dark',
        border: 'border border-brand-neon/50',
        textAccent: 'text-brand-neon',
        textColor: 'text-white',
        iconColor: 'text-brand-neon drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]'
      };

  const activeTheme = theme || defaultTheme;
  const mainTextColor = activeTheme.textColor || 'text-white';

  return (
    <div className={`relative aspect-[1.6/1] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${activeTheme.background} ${activeTheme.border} ${className}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-brand-neon/10 rounded-full blur-xl -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-[50%] h-[80%] bg-blue-500/10 rounded-full blur-2xl translate-y-10 -translate-x-10"></div>
      
      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <span className={`font-bold ${mainTextColor} italic text-xl md:text-2xl tracking-tighter`}>7<span className={activeTheme.textAccent}>Arts</span></span>
          <span className={`text-[10px] font-bold ${activeTheme.textAccent} ${activeTheme.border} px-2 py-1 rounded tracking-widest uppercase bg-black/20 backdrop-blur-sm`}>Gift Card</span>
        </div>
        
        <div className="text-center mt-2">
           <h4 className={`${mainTextColor} font-bold text-lg md:text-2xl leading-tight drop-shadow-md`}>
             {type === '12_MONTHS' ? 'Едногодишен' : '6-Месечен'} <br/> <span className={`${activeTheme.textAccent} font-light`}>Абонамент</span>
           </h4>
        </div>

        <div className="flex justify-between items-end">
           <span className={`text-xs ${mainTextColor} opacity-50 tracking-[0.2em]`}>•••• •••• •••• 7890</span>
           <Gift size={24} className={activeTheme.iconColor} />
        </div>
      </div>
    </div>
  );
};

export default VoucherCardFace;