import { Router } from 'express';
import { getAllSwimLanesForUser, getOneSwimLaneForUser } from './swim_lanes.controller';
import { checkSchema } from 'express-validator';

const router = Router();
const schema = checkSchema({
    project_id: {
        isInt: true,
    },
});

router.get('/', schema, getAllSwimLanesForUser);
router.get('/:id', schema, getOneSwimLaneForUser);

export default router;
