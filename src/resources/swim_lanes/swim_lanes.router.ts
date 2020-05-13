import { Router } from 'express';
import { getAllSwimLanesForUser } from './swim_lanes.controller';

const router = Router();

router.get('/', getAllSwimLanesForUser);

export default router;
