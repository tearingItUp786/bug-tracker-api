import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import config from './config';
import db from './db';
const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const stuff = await db.query('SELECT NOW()');
    res.json(stuff.rows);
});

const start = async () => {
    try {
        app.listen(config.port, () => {
            console.log(`running on port ${config.port}`);
        });
    } catch (e) {
        console.error(e);
    }
};

export { start };
