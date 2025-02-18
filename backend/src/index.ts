import dotenv from 'dotenv';
import express from 'express';
import weatherRoutes from './routes/weatherRoutes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
