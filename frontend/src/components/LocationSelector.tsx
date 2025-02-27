interface LocationSelectorProps {
    location: 'Vilnius' | 'Nida' | 'Both';
    setLocation: (location: 'Vilnius' | 'Nida' | 'Both') => void;
}

type Location = 'Vilnius' | 'Nida' | 'Both';

const LocationSelector: React.FC<LocationSelectorProps> = ({
    location,
    setLocation
}) => {
    return (
        <div className='flex gap-2'>
            {['Vilnius', 'Nida', 'Both'].map(loc => (
                <button
                    key={loc}
                    onClick={() => setLocation(loc as Location)}
                    className={`px-4 py-2 cursor-pointer rounded-md font-medium transition-all ${
                        location === loc
                            ? 'bg-[#6c3c1c] text-white'
                            : 'bg-white text-[#6c3c1c]'
                    }`}
                >
                    {loc}
                </button>
            ))}
        </div>
    );
};

export default LocationSelector;
