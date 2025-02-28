const calculateAngle = (pressure: number): number => {
    const minPressure = 970;
    const maxPressure = 1060;
    const minAngle = -90;
    const maxAngle = 90;

    return (
        ((pressure - minPressure) / (maxPressure - minPressure)) *
            (maxAngle - minAngle) +
        minAngle
    );
};

export { calculateAngle };
