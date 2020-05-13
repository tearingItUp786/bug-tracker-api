import { RequestHandler } from 'express';
import { UNPROCESSABLE_ENTITY, CREATED } from 'http-status-codes';
import {
    getProjectsForUser,
    getOneProject,
    addOneProject,
    updateOneProject,
    findProjectByName,
} from './projects.model';
import { AppError } from '@utils/AppError';
import { validationResult } from 'express-validator';
import { hasValidKeys } from '@utils/helpers';

export const getAll: RequestHandler = async (req, res, next) => {
    try {
        const projects = await getProjectsForUser(req.user.id);
        res.status(200).json({ data: projects });
    } catch (e) {
        next(e);
    }
};

export const getOne: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await getOneProject(Number(id), req.user.id);
        res.status(200).json({ data: project });
    } catch (e) {
        next(e);
    }
};

export const addOne: RequestHandler = async (req, res, next) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) throw new AppError(UNPROCESSABLE_ENTITY, 'Failed validation', valErrors.array());
        const [exists] = await findProjectByName(req.body.name);
        if (exists) throw new AppError(UNPROCESSABLE_ENTITY, `Project with name: ${req.body.name} already exists`);
        const { name, url } = req.body;
        const added = await addOneProject({ name, url }, req.user.id);
        res.header('Location', added.id).status(CREATED).json({ data: added });
    } catch (e) {
        next(e);
    }
};

export const updateOne: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) throw new AppError(UNPROCESSABLE_ENTITY, 'Need the id param for entry to update');
        if (!hasValidKeys(req.body, ['name', 'url'])) {
            res.status(200).send({});
        }
        const { name, url } = req.body;
        const project = await updateOneProject(Number(id), { name, url });
        res.status(204).json({ data: project });
    } catch (e) {
        next(e);
    }
};
