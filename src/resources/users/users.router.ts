import { Router } from 'express';
import { me, updateMe } from '../controllers/users';

const router = Router();

router.get('/', me);
router.put('/', updateMe);

export default router;
