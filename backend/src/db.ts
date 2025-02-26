import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

const db = pgp({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(error => console.error('Failed to connect to DB', error));

export default db;
