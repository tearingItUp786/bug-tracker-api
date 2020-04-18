import { Router } from 'express';
import { getAll, getOne, addOne } from '../controllers/projects';

const router = Router();

router.get('/', getAll).post('/', addOne);
router.get('/:id', getOne);

export default router;
