import { RequestHandler } from 'express';
import { getAllSwimLanes, getOneSwimLane, addOneSwimLane, updateSwimEntry } from './swim_lanes.model';
import { AppError } from '@utils/AppError';
import { OK, BAD_REQUEST, CREATED, NO_CONTENT } from 'http-status-codes';
import { validationResult } from 'express-validator';
import { RestSwimInterface } from 'typings';

const getAllSwimLanesForUser: RequestHandler = async (req, res, next) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) throw new AppError(BAD_REQUEST, 'Failed validation', valErrors.array());
        const { project_id: nId } = req.body;
        if (nId !== 0 && !nId) throw new AppError(BAD_REQUEST, 'Need a project id');
        const data = await getAllSwimLanes(nId, req.user.id);
        res.status(OK).json({ data });
    } catch (e) {
        next(e);
    }
};

const getOneSwimLaneForUser: RequestHandler = async (req, res, next) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) throw new AppError(BAD_REQUEST, 'Failed validation', valErrors.array());
        const { id } = req.params;
        const { project_id } = req.body;
        const data = await getOneSwimLane(project_id, Number(id), req.user.id);
        res.status(OK).json({ data });
    } catch (e) {
        next(e);
    }
};

const addSwimLane: RequestHandler = async (req: any & { body: RestSwimInterface }, res, next) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) throw new AppError(BAD_REQUEST, 'Failed validation', valErrors.array());
        const { project_id, name, description } = req.body;
        const added = await addOneSwimLane({ project_id, name, description });
        res.status(CREATED).json({ added });
    } catch (e) {
        next(e);
    }
};

const updateOneSwim: RequestHandler = async (req: any & { body: RestSwimInterface }, res, next) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) throw new AppError(BAD_REQUEST, 'Failed validation', valErrors.array());
        const { id } = req.params;
        const { project_id, name, description } = req.body;
        const updated = await updateSwimEntry({ project_id, name, description }, Number(id), req.user.id);
        res.status(NO_CONTENT).json({ updated });
    } catch (e) {
        next(e);
    }
};

export { getAllSwimLanesForUser, getOneSwimLaneForUser, addSwimLane, updateOneSwim };
