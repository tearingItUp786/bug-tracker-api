import { Router } from 'express';
import { getAllProjectIssues, getOneProjectIssue } from './issues.controller';
import { checkSchema } from 'express-validator';

const router = Router();
const schema = checkSchema({
    project_id: {
        isInt: true,
    },
});

router.route('/').get(schema, getAllProjectIssues);
router.route('/:id').get(schema, getOneProjectIssue);

export default router;
