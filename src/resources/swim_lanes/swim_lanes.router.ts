import { Router } from 'express';
import {
    getAllSwimLanesForUser,
    getOneSwimLaneForUser,
    addSwimLane,
    updateOneSwim,
    delOneSwim,
} from './swim_lanes.controller';
import { checkSchema } from 'express-validator';

const router = Router();
const schema = checkSchema({
    project_id: {
        isInt: true,
    },
});

const putSchema = checkSchema({
    id: {
        in: ['params'],
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
router.route('/:id').get(schema, getOneSwimLaneForUser).put(putSchema, updateOneSwim).delete(putSchema, delOneSwim);

export default router;
