import { useState, useEffect } from 'react';
import { BarometerData } from '../types';

const useFetchWeather = (location: 'Vilnius' | 'Nida' | 'Both') => {
    const [weatherData, setWeatherData] = useState<BarometerData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const cities =
                    location === 'Both' ? ['Vilnius', 'Nida'] : [location];

                const responses = await Promise.all(
                    cities.map(async city => {
                        const res = await fetch(
                            `http://localhost:5000/api/weather?city=${city}`
                        );
                        if (!res.ok)
                            throw new Error(`Failed to fetch ${city} data`);
                        return res.json();
                    })
                );

                setWeatherData(responses);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    return { weatherData, loading, error };
};

export default useFetchWeather;
