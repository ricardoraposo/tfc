import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchController from '../controllers/match.controller';

const router = Router();

const matchController = new MatchController();

router.get('/', async (req, res) => matchController.getMatches(req, res));

router.patch(
  '/:id/finish',
  authMiddleware,
  async (req, res) => matchController.changeMatchStatus(req, res),
);

router.patch(
  '/:id',
  authMiddleware,
  async (req, res) => matchController.changeMatchScores(req, res),
);

export default router;
