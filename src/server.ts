import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import config from './config';
import { signUp, signIn, protect } from './utils/auth';
import userRouter from './routes/users';
import projectRouter from './routes/projects';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.post('/signup', signUp);
app.post('/signin', signIn);

app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

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
