import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '@utils/AppError';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { getAllUserIssues, getOneUserIssue, addOneUserIssue } from './issues.model';
import { RestIssueData } from 'typings';

const getAllProjectIssues: RequestHandler = async (req, res, next) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) throw new AppError(BAD_REQUEST, 'Failed validation', valErrors.array());
        const { project_id } = req.body;
        const data = await getAllUserIssues(project_id, req.user.id);
        res.status(OK).json({ data });
    } catch (e) {
        next(e);
    }
};

const getOneProjectIssue: RequestHandler = async (req, res, next) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) throw new AppError(BAD_REQUEST, 'Failed validation', valErrors.array());
        const { id } = req.params;
        const { project_id } = req.body;
        const issue = await getOneUserIssue(project_id, req.user.id, Number(id));
        res.status(OK).json({ issue });
    } catch (e) {
        next(e);
    }
};

const addProjectIssue: RequestHandler = async (req: any & { body: RestIssueData }, res, next) => {
    try {
        const valErrors = validationResult(req);
        if (!valErrors.isEmpty()) throw new AppError(BAD_REQUEST, 'Failed validation', valErrors.array());
        const { url, name, description, severity, swim_lane_id, assignee_id, reporter_id } = req.body;
        const issue = await addOneUserIssue({
            url,
            name,
            description,
            severity,
            swim_lane_id,
            assignee_id,
            reporter_id,
        });

        res.status(OK).json({ issue });
    } catch (e) {
        next(e);
    }
};

export { getAllProjectIssues, getOneProjectIssue, addProjectIssue };
