import { Router } from 'express';
import { getAllSwimLanesForUser, getOneSwimLaneForUser, addSwimLane, updateOneSwim } from './swim_lanes.controller';
import { checkSchema } from 'express-validator';

const router = Router();
const schema = checkSchema({
    project_id: {
        isInt: true,
    },
});

const postSchema = checkSchema({
    name: {
        isString: true,
        optional: true,
    },
    description: {
        isString: true,
        optional: true,
    },
    project_id: {
        isInt: true,
    },
});

router.route('/').get(schema, getAllSwimLanesForUser).post(postSchema, addSwimLane);
router.route('/:id').get(schema, getOneSwimLaneForUser).put(schema, updateOneSwim);

export default router;
