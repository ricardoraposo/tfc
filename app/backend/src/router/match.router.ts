import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

const matchController = new MatchController();

router.get('/', async (req, res) => matchController.getMatches(req, res));

export default router;
