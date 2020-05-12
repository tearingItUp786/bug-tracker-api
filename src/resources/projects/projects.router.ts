import { Router } from 'express';

import { getAll, getOne, addOne, updateOne } from './projects.controller';
import { checkSchema } from 'express-validator';

const router = Router();
router
    .route('/')
    .get(getAll)
    .post(
        checkSchema({
            name: {
                isString: true,
            },
            url: {
                isString: true,
            },
        }),
        addOne,
    );
router.route('/:id').get(getOne).put(updateOne);

export default router;
