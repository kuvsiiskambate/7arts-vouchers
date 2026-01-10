import React from 'react';
import { Gift, Play } from 'lucide-react';
import VoucherCardFace from './VoucherCardFace';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const handleHowItWorksClick = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-16 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-blue rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-brand-neon rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center space-x-2 bg-brand-blue/20 border border-brand-neon/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.2)] mx-auto lg:mx-0">
              <span className="flex h-2 w-2 rounded-full bg-brand-neon animate-pulse"></span>
              <span className="text-sm font-medium text-brand-neon">Перфектният подарък за всеки повод</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Подари хиляди <span className="text-neon-gradient">емоции</span> <br className="hidden md:block" />
              с 7Arts
            </h1>

            <p className="mt-4 max-w-2xl text-xl text-gray-300 mb-10 leading-relaxed mx-auto lg:mx-0">
              Изберете подаръчен ваучер и отворете вратите към света на театъра, операта и киното. <br/>
              <span className="text-brand-neon/80">Достъпен подарък. Безценно изживяване.</span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={onCtaClick}
                className="group bg-brand-neon hover:bg-brand-neonHover text-brand-dark text-lg font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all flex items-center"
              >
                <Gift className="mr-2 group-hover:rotate-12 transition-transform" />
                Избери Ваучер
              </button>
              
              <button 
                onClick={handleHowItWorksClick}
                className="text-gray-300 hover:text-white font-medium flex items-center transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-brand-neon group-hover:text-brand-dark transition-all">
                   <Play size={16} className="ml-1" fill="currentColor" />
                </div>
                Как работи
              </button>
            </div>
          </div>

          {/* Visual Content (3D Cards) */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
             {/* Glow effect behind */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-neon/10 blur-[80px] rounded-full pointer-events-none"></div>
             
             <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center animate-float">
                {/* Back Card (6 Months) */}
                <div className="absolute transform translate-x-12 -translate-y-12 rotate-12 w-[80%] z-10 opacity-60 hover:opacity-100 transition-all duration-500 hover:rotate-6">
                   <VoucherCardFace type="6_MONTHS" />
                </div>
                
                {/* Front Card (12 Months) */}
                <div className="relative z-20 w-[90%] transform -rotate-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)] hover:rotate-0 transition-transform duration-500">
                   <VoucherCardFace type="12_MONTHS" />
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;