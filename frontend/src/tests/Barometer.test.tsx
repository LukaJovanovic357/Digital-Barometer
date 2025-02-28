import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Barometer from '../components/Barometer';
import type { BarometerData } from '../types';

describe('Barometer Component', () => {
    const mockData: BarometerData = {
        city: 'Vilnius',
        pressure: 1015,
        status: 'stormy',
        trend: 'rising'
    };

    it('renders city name correctly', () => {
        render(<Barometer data={mockData} />);
        expect(screen.getByText(/Vilnius/i)).toBeInTheDocument();
    });

    it('displays the correct pressure value', () => {
        render(<Barometer data={mockData} />);
        expect(screen.getByText(/1015.0 hPa/i)).toBeInTheDocument();
    });

    it('shows the correct trend indicator for rising pressure', () => {
        render(<Barometer data={mockData} />);
        expect(screen.getByText(/↑ Rising/i)).toBeInTheDocument();
    });

    it('shows the correct trend indicator for falling pressure', () => {
        const fallingData: BarometerData = { ...mockData, trend: 'falling' };
        render(<Barometer data={fallingData} />);
        expect(screen.getByText(/↓ Falling/i)).toBeInTheDocument();
    });

    it('displays the correct status', () => {
        render(<Barometer data={mockData} />);
        expect(screen.getByText(/stormy/i)).toBeInTheDocument();
    });
});
