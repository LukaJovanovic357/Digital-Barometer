import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from '../pages/Dashboard';

describe('Dashboard Component', () => {
    it('renders the header correctly', () => {
        render(<Dashboard />);
        expect(screen.getByText(/Aneroid Barometer/i)).toBeInTheDocument();
    });
});

