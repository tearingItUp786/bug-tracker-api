import { Router } from 'express';

import { getAll, getOne, addOne, updateOne } from './projects.controller';
import { checkSchema } from 'express-validator';

const router = Router();
const schema = checkSchema({
    name: {
        isString: true,
    },
    url: {
        isString: true,
    },
});
router.route('/').get(getAll).post(schema, addOne);
router.route('/:id').get(getOne).put(updateOne);

export default router;
