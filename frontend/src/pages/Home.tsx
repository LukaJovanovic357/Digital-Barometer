import { useState, useEffect } from 'react';
import Barometer from '../components/Barometer';
import LocationSelector from '../components/LocationSelector';

type WeatherData = {
    city: string;
    pressure: number;
    trend: 'rising' | 'falling';
    status: 'stormy' | 'rain' | 'change' | 'fair' | 'very dry';
};

const Dashboard = () => {
    const [location, setLocation] = useState<'Vilnius' | 'Nida' | 'Both'>(
        'Both'
    );
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const cities =
                    location === 'Both' ? ['Vilnius', 'Nida'] : [location];
                const responses = await Promise.all(
                    cities.map(async city => {
                        const res = await fetch(
                            `http://localhost:5000/api/weather?city=${city}`
                        );
                        return res.json();
                    })
                );
                setWeatherData(responses);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, [location]);

    return (
        <div className='flex flex-col items-center p-4 bg-[#f5ede4] min-h-screen'>
            <h1 className='text-3xl font-bold text-[#6c3c1c] mb-4'>
                Aneroid Barometer
            </h1>
            <LocationSelector location={location} setLocation={setLocation} />
            <div className='flex gap-6 mt-6'>
                {weatherData.map(data => (
                    <Barometer key={data.city} data={data} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
