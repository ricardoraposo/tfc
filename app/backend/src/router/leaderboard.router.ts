import { Router } from 'express';

import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/', (req, res) => leaderboardController.getLeaderboard(req, res));
router.get('/home', (req, res) => leaderboardController.getLeaderboardHome(req, res));
router.get('/away', (req, res) => leaderboardController.getLeaderboardAway(req, res));

export default router;
