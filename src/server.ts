import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import config from '@config';
import { signUp, signIn, protect } from '@utils/auth';
import userRouter from '@resources/users';
import projectRouter from '@resources/projects';
import swimLaneRouter from '@resources/swim_lanes';
import issueRouter from '@resources/issues';
import { handleError, logError, internalError } from '@utils/AppError';
import { NOT_FOUND } from 'http-status-codes';

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('common'));

app.post('/signup', signUp);
app.post('/signin', signIn);

app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/swim', swimLaneRouter);
app.use('/api/issue', issueRouter);
app.use((_req, res) => {
    res.status(NOT_FOUND).json({
        message: 'Route not found',
    });
});

app.use(logError);
app.use(handleError);
app.use(internalError);

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
