import dotenv from 'dotenv';
import express from 'express';
import weatherRoutes from './routes/weatherRoutes';
import { createWeatherTable } from './models/weatherModel';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/weather', weatherRoutes);

createWeatherTable().then(() => {
    console.log('Weather table is ready');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
