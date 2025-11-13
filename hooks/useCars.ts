
import { useState, useEffect, useCallback } from 'react';
import type { Car } from '../types';
import { fetchCars, fetchCarById } from '../services/wordpressService';

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadCars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCars();
      setCars(data);
    } catch (err) {
      setError('Failed to load cars.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  return { cars, loading, error, refresh: loadCars };
};

export const useCar = (id: string) => {
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadCar = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            setError(null);
            const data = await fetchCarById(id);
            setCar(data);
        } catch (err) {
            setError('Failed to load car details.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadCar();
    }, [loadCar]);

    return { car, loading, error };
};
