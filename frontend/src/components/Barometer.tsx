interface BarometerProps {
    data: {
        city: string;
        pressure: number;
        trend: 'rising' | 'falling';
        status: 'stormy' | 'rain' | 'change' | 'fair' | 'very dry';
    };
}

const pressureLables = [
    { value: 1060, position: 'top-1' },
    { value: 1030, position: 'right-2' },
    { value: 1000, position: 'bottom-2' },
    { value: 970, position: 'left-2' }
];

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
        <div className='bg-white rounded-xl shadow-lg p-6 min-w-96 flex flex-col items-center'>
            <h2 className='text-lg font-bold text-[#6c3c1c] mb-2'>
                {data.city}
            </h2>
            <div className='relative w-80 h-80 flex items-center justify-center border-4 border-[#b38e5d] rounded-full bg-[#fdf8f3]'>
                {pressureLables.map(label => (
                    <span
                        className={`absolute ${label.position} text-[#6c3c1ccf] font-semibold`}
                    >
                        {label.value}
                    </span>
                ))}
                <div
                    className='absolute w-1 h-24 bg-[#6c3c1c] origin-bottom transition-transform duration-500 flex justify-center'
                    style={{ transform: `rotate(${angle}deg)`, bottom: '45%' }}
                >
                    <div className='w-4 h-4 bg-[#6c3c1c] rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2'></div>{' '}
                </div>

                <p className='absolute bottom-8 text-lg font-semibold text-[#6c3c1c]'>
                    {data.pressure.toFixed(1)} hPa
                </p>

                <span className='absolute top-7 bg-green-500 text-white px-2 py-1 rounded-full text-sm'>
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
