import dotenv from 'dotenv';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import weatherRoutes from './routes/weatherRoutes';
import { createWeatherTable } from './models/weatherModel';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const whitelist = ['http://localhost:5173'];

const corsOptions: CorsOptions = {
    origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
    ) => {
        if (whitelist.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/weather', weatherRoutes);

createWeatherTable().then(() => {
    console.log('Weather table is ready');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
