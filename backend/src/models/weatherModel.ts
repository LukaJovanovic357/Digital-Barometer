import { z } from 'zod';

export const WeatherSchema = z.object({
    city: z.string(),
    pressure: z.number(),
    status: z.enum(['stormy', 'rain', 'change', 'fair', 'very dry'])
});

export type WeatherData = z.infer<typeof WeatherSchema>;
