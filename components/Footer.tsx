
import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10 text-sm text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white text-xl font-bold mb-4">7Arts.bg</h4>
            <p className="max-w-sm mb-4">
              Първата българска стрийминг платформа за театър, опера, балет и кино. Гледайте най-добрите представления от всяка точка на света.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Бързи връзки</h4>
            <ul className="space-y-2">
              <li><a href="https://7arts.bg/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-neon transition-colors">Каталог</a></li>
              <li><a href="https://7arts.bg/faq" target="_blank" rel="noopener noreferrer" className="hover:text-brand-neon transition-colors">Въпроси и отговори</a></li>
              <li><a href="https://7arts.bg/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-brand-neon transition-colors">Общи условия</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Контакти</h4>
            <ul className="space-y-2">
              <li className="flex items-center"><Mail size={16} className="mr-2"/> info@7arts.bg</li>
              <li className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-brand-neon transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-white hover:text-brand-neon transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-white hover:text-brand-neon transition-colors"><Youtube size={20} /></a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} 7Arts.bg. Всички права запазени.</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="mr-4">Visa</span>
            <span className="mr-4">Mastercard</span>
            <a href="#admin" className="text-gray-800 hover:text-gray-600 ml-4 p-1" aria-label="Admin Access">
               <Lock size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
