import express from 'express';
import config from './config';

const app = express();

app.get('/', (req, res) => res.send('hello world'));

app.listen(config.port, () => {
    console.log(`running on port ${config.port}`);
});
