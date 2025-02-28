import { describe, it, expect } from 'vitest';
import { calculateAngle } from '../utils/functions';

describe('calculateAngle', () => {
    it('returns -90° for minimum pressure (970 hPa)', () => {
        expect(calculateAngle(970)).toBe(-90);
    });

    it('returns 90° for maximum pressure (1060 hPa)', () => {
        expect(calculateAngle(1060)).toBe(90);
    });

    it('returns 0° for middle pressure (1015 hPa)', () => {
        expect(calculateAngle(1015)).toBeCloseTo(0, 1);
    });

    it('handles pressure below min (e.g., 960 hPa)', () => {
        expect(calculateAngle(960)).toBeLessThan(-90);
    });

    it('handles pressure above max (e.g., 1070 hPa)', () => {
        expect(calculateAngle(1070)).toBeGreaterThan(90);
    });
});
