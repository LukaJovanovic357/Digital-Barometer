import { useState, useEffect } from 'react';
import Barometer from '../components/Barometer';
import LocationSelector from '../components/LocationSelector';
import useFetchWeather from '../hooks/useFetchWeather';
import { toast } from 'react-hot-toast';
import Spinner from '../components/Spinner';

const Dashboard = () => {
    const [location, setLocation] = useState<'Vilnius' | 'Nida' | 'Both'>(
        'Both'
    );
    const { weatherData, loading, error } = useFetchWeather(location);

    useEffect(() => {
        if (error) {
            toast.error(`Error fetching data: ${error}`);
        }
    }, [error]);

    return (
        <div className='flex flex-col items-center p-4 bg-[#f5ede4] min-h-screen'>
            <h1 className='text-3xl font-bold text-[#6c3c1c] mb-4'>
                Aneroid Barometer
            </h1>
            <LocationSelector location={location} setLocation={setLocation} />
            {loading && <Spinner />}
            <div className='flex gap-6 mt-6'>
                {weatherData.map(data => (
                    <Barometer key={data.city} data={data} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
