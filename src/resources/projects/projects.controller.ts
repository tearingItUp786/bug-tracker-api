import { Request, Response, NextFunction } from 'express';
import { UNPROCESSABLE_ENTITY, CREATED } from 'http-status-codes';
import {
    getProjectsForUser,
    getOneProject,
    addOneProject,
    updateOneProject,
    findProjectByName,
} from './projects.model';
import { AppError } from '../../utils/AppError';
import { validationResult } from 'express-validator';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await getProjectsForUser(req.user.id);
        res.status(200).json({ data: projects });
    } catch (e) {
        next(e);
    }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const project = await getOneProject(Number(id), req.user.id);
        res.status(200).json({ data: project });
    } catch (e) {
        next(e);
    }
};

export const addOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) throw new AppError(UNPROCESSABLE_ENTITY, 'Failed validation', valErrors.array());
        const [exists] = await findProjectByName(req.body.name);
        if (exists) throw new AppError(UNPROCESSABLE_ENTITY, `Project with name: ${req.body.name} already exists`);

        const added = await addOneProject(req.body, req.user.id);
        res.header('Location', added.id).status(CREATED).json({ data: added });
    } catch (e) {
        next(e);
    }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id) throw new AppError(UNPROCESSABLE_ENTITY, 'Need the id param for entry to update');
        const project = await updateOneProject(Number(id), req.body);
        res.status(204).json({ data: project });
    } catch (e) {
        next(e);
    }
};
