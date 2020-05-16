import { RequestHandler } from 'express';
import { getAllSwimLanes, getOneSwimLane } from './swim_lanes.model';
import { AppError } from '@utils/AppError';
import { OK, BAD_REQUEST } from 'http-status-codes';
import { validationResult } from 'express-validator';

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

export { getAllSwimLanesForUser, getOneSwimLaneForUser };
