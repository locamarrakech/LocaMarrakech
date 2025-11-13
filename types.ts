
export interface Car {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  featured_media_url?: string;
  car_price: string;
  car_transmission: string;
  car_seats: string;
  car_fuel: string;
  car_model: string;
  car_speed_km: string;
  car_gallery: number[];
  gallery_urls?: string[];
  acf: {
    car_features?: {
      label: string;
      value: string;
    }[];
  }
}

export interface Media {
  id: number;
  source_url: string;
  alt_text: string;
}

export type Language = 'fr' | 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface AppContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  translations: Record<string, Record<Language, string>>;
  t: (key: string) => string;
}
