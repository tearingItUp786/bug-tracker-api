import { Router } from 'express';
import { getAllProjectIssues, getOneProjectIssue, addProjectIssue } from './issues.controller';
import { checkSchema } from 'express-validator';

const router = Router();
const schema = checkSchema({
    project_id: {
        isInt: true,
    },
});

const postSchema = checkSchema({
    reporter_id: {
        isInt: true,
    },
    severity: {
        isIn: {
            options: ['CRITICAL', 'SEVERE', 'NORMAL', 'LOW'],
            errorMessage: 'Invalid enum value',
        },
    },
    name: {
        isString: true,
        optional: true,
    },
    description: {
        isString: true,
        optional: true,
    },
    swim_lane_id: {
        isInt: true,
    },
    assignee_id: {
        isInt: true,
        optional: true,
    },
});

router.route('/').get(schema, getAllProjectIssues).post(postSchema, addProjectIssue);
router.route('/:id').get(schema, getOneProjectIssue);

export default router;
