import React, { useState } from 'react';
import { useCar } from '../hooks/useCars';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAppContext } from '../context/AppContext';

interface CarDetailsPageProps {
  carId: string;
}

const CarDetailsPage: React.FC<CarDetailsPageProps> = ({ carId }) => {
  const { car, loading, error } = useCar(carId);
  const { t } = useAppContext();
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  if (loading) return <div className="min-h-screen"><LoadingSpinner /></div>;
  if (error) return <p className="text-center text-red-500 py-20">{error}</p>;
  if (!car) return <p className="text-center py-20">Car not found.</p>;
  
  const allImages = [car.featured_media_url, ...(car.gallery_urls || [])].filter(Boolean) as string[];
  const currentImage = mainImage || allImages[0];

  const SpecItem: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
      <span className="font-semibold text-gray-600 dark:text-gray-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="lg:col-span-3">
          <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
            <img src={currentImage} alt={car.title.rendered} className="w-full h-auto object-cover aspect-[4/3]" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {allImages.map((img, index) => (
              <button key={index} onClick={() => setMainImage(img)} className={`rounded-lg overflow-hidden border-2 ${currentImage === img ? 'border-primary' : 'border-transparent'}`}>
                <img src={img} alt={`${car.title.rendered} - ${index + 1}`} className="w-full h-auto object-cover aspect-square" />
              </button>
            ))}
          </div>
        </div>

        {/* Car Info */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">{car.title.rendered}</h1>
          <p className="text-3xl font-semibold text-primary mb-6">{car.car_price} DH / {t('day')}</p>
          
          <div className="mb-8">
              <h2 className="text-2xl font-bold font-serif mb-4">{t('specifications')}</h2>
              <div className="space-y-2">
                  <SpecItem label={t('modelYear')} value={car.car_model} />
                  <SpecItem label={t('transmission')} value={car.car_transmission} />
                  <SpecItem label={t('seats')} value={car.car_seats} />
                  <SpecItem label={t('fuel')} value={car.car_fuel} />
                  <SpecItem label={t('maxSpeed')} value={car.car_speed_km ? `${car.car_speed_km} km/h` : 'N/A'} />
              </div>
          </div>

          <button className="w-full bg-primary hover:bg-yellow-500 text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300">
            {t('bookNow')}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold font-serif mb-4">{t('description')}</h2>
        <div 
          className="prose dark:prose-invert max-w-none text-text-light dark:text-text-dark"
          dangerouslySetInnerHTML={{ __html: car.content.rendered }}
        />
      </div>
    </div>
  );
};

export default CarDetailsPage;