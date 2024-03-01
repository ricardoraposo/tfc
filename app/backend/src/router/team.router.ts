import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/', (req, res) => teamController.getTeams(req, res));

export default router;
