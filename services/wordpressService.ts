
import type { Car, Media } from '../types';

const API_BASE_URL = 'https://lm.pediamower.top/wp-json/wp/v2';

const mediaCache = new Map<number, Media>();

export const fetchMediaById = async (id: number): Promise<Media | null> => {
  if (mediaCache.has(id)) {
    return mediaCache.get(id) || null;
  }
  try {
    const response = await fetch(`${API_BASE_URL}/media/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch media with id ${id}`);
    }
    const data: Media = await response.json();
    mediaCache.set(id, data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchCars = async (): Promise<Car[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars?_embed&per_page=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    const cars: Car[] = await response.json();

    // Enrich cars with featured media URL
    const enrichedCars = await Promise.all(
      cars.map(async (car) => {
        if (car.featured_media) {
          const media = await fetchMediaById(car.featured_media);
          car.featured_media_url = media?.source_url;
        }
        return car;
      })
    );

    return enrichedCars;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCarById = async (id: string): Promise<Car | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/cars/${id}?_embed`);
        if (!response.ok) {
            throw new Error(`Failed to fetch car with id ${id}`);
        }
        let car: Car = await response.json();

        // Enrich with featured media URL
        if (car.featured_media) {
            const media = await fetchMediaById(car.featured_media);
            car.featured_media_url = media?.source_url;
        }

        // Enrich with gallery URLs
        if (car.car_gallery && car.car_gallery.length > 0) {
            const galleryMedia = await Promise.all(
                car.car_gallery.map(mediaId => fetchMediaById(mediaId))
            );
            car.gallery_urls = galleryMedia
                .filter((media): media is Media => media !== null)
                .map(media => media.source_url);
        }
        
        return car;
    } catch (error) {
        console.error(error);
        return null;
    }
};
