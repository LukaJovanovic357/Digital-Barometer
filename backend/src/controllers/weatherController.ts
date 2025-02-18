import { Request, Response } from 'express';
import { fetchWeatherData } from '../services/weatherService';

export const getWeatherData = async (req: Request, res: Response) => {
    try {
        const city = req.query.city as string;
        const weatherData = await fetchWeatherData(city);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
