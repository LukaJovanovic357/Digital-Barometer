import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

console.log('watch mode doing its thingggg');

const weatherApiKey = process.env.WEATHER_API_KEY;
