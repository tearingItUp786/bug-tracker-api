import { Router } from 'express';
import { me, updateMe } from './users.controller';
import { checkSchema } from 'express-validator';

const router = Router();

router.get('/', me);
router.put(
    '/',
    checkSchema({
        first_name: {
            isString: true,
            optional: true,
        },
        last_name: {
            isString: true,
            optional: true,
        },
        email: {
            isEmail: true,
            optional: true,
        },
    }),
    updateMe,
);

export default router;
