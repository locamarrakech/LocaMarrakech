
import React from 'react';
import { useAppContext } from '../context/AppContext';

const AboutPage: React.FC = () => {
  const { t } = useAppContext();

  return (
    <div className="bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">{t('aboutTitle')}</h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('aboutText')}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto mt-16">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/1200/675?random=1" 
              alt="LocaMarrakech Office" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
