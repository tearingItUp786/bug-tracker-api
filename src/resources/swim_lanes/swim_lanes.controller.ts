import { RequestHandler } from 'express';
import { getAllSwimLanes } from './swim_lanes.model';
import { AppError } from '@utils/AppError';
import { UNPROCESSABLE_ENTITY, OK } from 'http-status-codes';

const getAllSwimLanesForUser: RequestHandler = async (req, res, next) => {
    try {
        const { project_id: id } = req.body;
        const nId = Number(id);
        if (nId !== 0 && !id) throw new AppError(UNPROCESSABLE_ENTITY, 'Need a project id');
        const data = await getAllSwimLanes(nId, req.user.id);
        res.status(OK).json({ data });
    } catch (e) {
        next(e);
    }
};

export { getAllSwimLanesForUser };
