import { RequestHandler } from 'express';
import { updateUser } from './users.model';
import { AppError } from '@utils/AppError';
import { hasValidKeys } from '@utils/helpers';
import { UNPROCESSABLE_ENTITY } from 'http-status-codes';
import { validationResult } from 'express-validator';

export const me: RequestHandler = (req, res) => res.status(200).json({ data: req.user });

export const updateMe: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.user;
        if (!id) throw new AppError(UNPROCESSABLE_ENTITY, 'Need the id param for update');
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) throw new AppError(UNPROCESSABLE_ENTITY, 'Failed validation', valErrors.array());

        if (!hasValidKeys(req.body, ['first_name', 'last_name', 'email'])) {
            res.status(200).send({});
        }
        const { first_name, last_name, email } = req.body;
        const update = await updateUser(Number(id), { first_name, last_name, email });
        res.status(200).send(update);
    } catch (error) {
        next(error);
    }
};
