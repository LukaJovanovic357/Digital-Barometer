import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LocationSelector from '../components/LocationSelector';
// import type { Location } from '../types';

describe('LocationSelector Component', () => {
    it('renders all location buttons', () => {
        const mockSetLocation = vi.fn();
        render(
            <LocationSelector location='Both' setLocation={mockSetLocation} />
        );

        expect(screen.getByText(/Vilnius/i)).toBeInTheDocument();
        expect(screen.getByText(/Nida/i)).toBeInTheDocument();
        expect(screen.getByText(/Both/i)).toBeInTheDocument();
    });

    it('calls setLocation when a button is clicked', () => {
        const mockSetLocation = vi.fn();
        render(
            <LocationSelector location='Both' setLocation={mockSetLocation} />
        );

        const vilniusButton = screen.getByText(/Vilnius/i);
        fireEvent.click(vilniusButton);

        expect(mockSetLocation).toHaveBeenCalledWith('Vilnius');
    });

    it('highlights the selected location', () => {
        const mockSetLocation = vi.fn();
        render(
            <LocationSelector
                location='Vilnius'
                setLocation={mockSetLocation}
            />
        );

        const selectedButton = screen.getByText(/Vilnius/i);
        expect(selectedButton).toHaveClass('bg-[#6c3c1c] text-white');
    });
});
