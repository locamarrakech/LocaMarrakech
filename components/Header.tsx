import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { t } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);


  const navLinks = [
    { href: '#/', label: t('home') },
    { href: '#/cars', label: t('cars') },
    { href: '#/blog', label: t('blog') },
    { href: '#/about', label: t('about') },
    { href: '#/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <a href="#/" className="flex-shrink-0">
             <img src="https://i.ibb.co/F4B0pNsV/locamarrakech.png" alt="LocaMarrakech Logo" className="h-14 md:h-16 w-auto" />
          </a>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => {
              const isActive = (link.href === '#/' && currentPath === link.href) || 
                               (link.href !== '#/' && link.href !== '#/blog' && currentPath.startsWith(link.href)) ||
                               (link.href ==='#/blog' && currentPath ==='#/blog');

              return (
              <a 
                key={link.href} 
                href={link.href} 
                className={`text-sm font-semibold uppercase tracking-wider transition-colors pb-2 ${
                  isActive 
                  ? 'text-primary border-b border-primary' 
                  : 'text-white hover:text-primary border-b border-transparent'
                }`}
              >
                {link.label}
              </a>
            )})}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+212627573069" className="flex items-center space-x-3 group">
                <div className="p-3 border border-gray-600 rounded-full group-hover:border-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs text-gray-400 uppercase">{t('callUs')}</p>
                    <p className="font-bold text-sm">+212 6 27 57 30 69</p>
                </div>
            </a>
            <LanguageSwitcher />
            <ThemeToggle />
            <a href="#/cars" className="bg-gradient-to-b from-[#DAB875] to-[#C09A55] hover:from-[#C09A55] hover:to-[#DAB875] text-black font-bold py-3 px-6 rounded-lg text-sm uppercase transition-all duration-300 shadow-md">
              {t('reserve')}
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-primary hover:bg-gray-900">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="px-4 pb-4 flex items-center justify-between">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;