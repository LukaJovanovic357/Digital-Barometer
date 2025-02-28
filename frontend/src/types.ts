type Location = 'Both' | 'Nida' | 'Vilnius';

type BarometerData = {
    city: string;
    pressure: number;
    trend: 'rising' | 'falling';
    status: 'stormy' | 'rain' | 'change' | 'fair' | 'very dry';
};

export type { Location, BarometerData };
