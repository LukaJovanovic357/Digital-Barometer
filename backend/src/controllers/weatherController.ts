import { Request, Response } from 'express';
import {
    saveWeather,
    getLatestWeather,
    WeatherSchema
} from '../models/weatherModel';
import { fetchWeatherData } from '../services/weatherService';

export const getWeatherData = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const city = req.query.city as string;
        if (!city) {
            res.status(400).json({ error: 'City is required' });
            return;
        }

        const latestWeather = await getLatestWeather(city);

        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        if (
            latestWeather?.timeStamp &&
            new Date(latestWeather.timeStamp) > tenMinutesAgo
        ) {
            res.json(latestWeather);
            return;
        }

        const weatherData = await fetchWeatherData(city);
        const parsedData = WeatherSchema.parse(weatherData);

        await saveWeather(parsedData);

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getStoredWeatherData = async (req: Request, res: Response) => {
    try {
        const city = req.query.city as string;

        const latestWeather = await getLatestWeather(city);

        if (!latestWeather) {
            return res
                .status(404)
                .json({ error: 'No weather data found for this city' });
        }

        res.json(latestWeather);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};
