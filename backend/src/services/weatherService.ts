import axios from 'axios';
import dotenv from 'dotenv';
import { getPressureStatus } from '../utils/getPressureStatus';
import { WeatherSchema, WeatherData } from '../models/weatherModel';

dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await axios.get(url);

    const pressure = response.data.main.pressure;

    const weather = {
        city,
        pressure: pressure,
        status: getPressureStatus(pressure)
    };

    const parsedWeather = WeatherSchema.parse(weather);
    return parsedWeather;
};
