
import React from 'react';
import type { Car } from '../types';
import { useAppContext } from '../context/AppContext';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { t } = useAppContext();

  const FeatureIcon: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      <span dangerouslySetInnerHTML={{ __html: icon }} className="w-5 h-5 text-primary"></span>
      <span>{label}</span>
    </div>
  );

  return (
    <div className="bg-white dark:bg-secondary rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
      <a href={`#/car/${car.id}`} className="block">
        <div className="relative h-56">
          {car.featured_media_url ? (
            <img src={car.featured_media_url} alt={car.title.rendered} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
            </div>
          )}
          <div className="absolute top-0 right-0 bg-primary text-white font-bold px-4 py-2 rounded-bl-lg">
            {car.car_price} DH/{t('day')}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-serif font-bold text-text-light dark:text-text-dark mb-2">{car.title.rendered}</h3>
          <div className="grid grid-cols-2 gap-4 my-4">
            <FeatureIcon icon='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>' label={car.car_transmission} />
            <FeatureIcon icon='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>' label={`${car.car_seats} ${t('seats')}`} />
            <FeatureIcon icon='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>' label={car.car_model} />
            <FeatureIcon icon='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a17.96 17.96 0 01-1.254 7.38m-5.84-2.56l-1.254 7.38m-4.496-4.82a17.96 17.96 0 011.254-7.38m4.496 2.56L12 11.25m0 0l-1.254-1.638M12 11.25L13.254 9.612m-1.254 1.638a6 6 0 112.508 0l-1.254 1.638z" /></svg>' label={car.car_fuel} />
          </div>
          <button className="w-full mt-4 bg-secondary dark:bg-primary text-white py-3 rounded-lg font-bold group-hover:bg-primary dark:group-hover:bg-yellow-500 transition-colors duration-300">
            {t('bookNow')}
          </button>
        </div>
      </a>
    </div>
  );
};

export default CarCard;
