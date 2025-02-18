export const getPressureStatus = (pressure: number) => {
    if (pressure < 980) return 'stormy';
    if (pressure < 1000) return 'rain';
    if (pressure < 1020) return 'change';
    if (pressure < 1040) return 'fair';
    return 'very dry';
};
