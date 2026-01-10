import React from 'react';
import { Film } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-orange p-2 rounded-lg">
              <Film className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              7<span className="text-brand-orange">Arts</span>.bg
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Начало</a>
            <a href="#pricing-section" className="text-gray-300 hover:text-white transition-colors">Ваучери</a>
            <a href="#corporate" className="text-gray-300 hover:text-white transition-colors">Корпоративни</a>
            <a href="#contacts" className="text-gray-300 hover:text-white transition-colors">Контакти</a>
          </nav>

          <button className="hidden md:block bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all">
            Вход
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;