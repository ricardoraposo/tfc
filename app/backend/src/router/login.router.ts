import { Router } from 'express';

import LoginController from '../controllers/login.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { validateLogin } from '../middlewares/validation.middleware';

const loginController = new LoginController();

const router = Router();

router.post('/', validateLogin, (req, res) => loginController.signIn(req, res));
router.get('/role', authMiddleware, (req, res) => loginController.getRole(req, res));

export default router;
