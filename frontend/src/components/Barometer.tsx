import React from 'react';

interface BarometerProps {
    data: {
        city: string;
        pressure: number;
        trend: 'rising' | 'falling';
        status: 'stormy' | 'rain' | 'change' | 'fair' | 'very dry';
    };
}

const Barometer: React.FC<BarometerProps> = ({ data }) => {
    const minPressure = 970;
    const maxPressure = 1060;
    const minAngle = -90;
    const maxAngle = 90;

    const angle =
        ((data.pressure - minPressure) / (maxPressure - minPressure)) *
            (maxAngle - minAngle) +
        minAngle;

    return (
        <div className='bg-white rounded-xl shadow-lg p-6 w-72 flex flex-col items-center'>
            <h2 className='text-lg font-bold text-[#6c3c1c] mb-2'>
                {data.city}
            </h2>
            <div className='relative w-60 h-60 flex items-center justify-center border-4 border-[#b38e5d] rounded-full bg-[#fdf8f3]'>
                <div
                    className='absolute w-1 h-24 bg-[#6c3c1c] origin-bottom transition-transform duration-500'
                    style={{ transform: `rotate(${angle}deg)` }}
                ></div>
                <p className='absolute bottom-4 text-lg font-semibold text-[#6c3c1c]'>
                    {data.pressure.toFixed(1)} hPa
                </p>
                <span className='absolute top-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm'>
                    {data.status}
                </span>
            </div>
            <p
                className={`mt-2 text-sm ${
                    data.trend === 'rising' ? 'text-green-600' : 'text-red-600'
                }`}
            >
                {data.trend === 'rising' ? '↑ Rising' : '↓ Falling'}
            </p>
        </div>
    );
};

export default Barometer;
