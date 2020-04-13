import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import config from './config';
import { signUp, signIn, protect } from './utils/auth';
const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.post('/signup', signUp);
app.post('/signin', signIn);

app.get('/', protect);
app.get('/', (req, res) => {
    res.status(200).send({ data: req.user });
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
