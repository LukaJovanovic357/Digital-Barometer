import { z } from 'zod';
import db from '../db';

export const WeatherSchema = z.object({
    id: z.number().optional(),
    city: z.string(),
    pressure: z.number(),
    status: z.enum(['stormy', 'rain', 'change', 'fair', 'very dry']),
    timeStamp: z.string().optional()
});

export const createWeatherTable = async () => {
    await db.none(`
        CREATE TABLE IF NOT EXISTS weather (
            id SERIAL PRIMARY KEY,
            city TEXT NOT NULL,
            pressure INT NOT NULL,
            status TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

export const saveWeather = async (weather: WeatherData) => {
    const parsedData = WeatherSchema.parse(weather);

    return db.one(
        `INSERT INTO weather (city, pressure, status) VALUES ($1, $2, $3) RETURNING *`,
        [parsedData.city, parsedData.pressure, parsedData.status]
    );
};

export const getLatestWeather = async (
    city: string
): Promise<WeatherData | null> => {
    const result = await db.oneOrNone(
        `SELECT * FROM weather WHERE city = $1 ORDER BY timestamp DESC LIMIT 1`,
        [city]
    );

    if (result) {
        return WeatherSchema.parse(result);
    }
    return null;
};

export type WeatherData = z.infer<typeof WeatherSchema>;
