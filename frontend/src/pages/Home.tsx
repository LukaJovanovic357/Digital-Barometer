import { useState, useEffect } from 'react';
import Barometer from '../components/Barometer';
import LocationSelector from '../components/LocationSelector';
import useFetchWeather from '../hooks/useFetchWeather';

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
    const { weatherData, loading, error } = useFetchWeather(location);

    if (loading) return <p>Loading...</p>;
    if (error) console.log('error occured');

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
