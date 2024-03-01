import { Router } from 'express';

import LoginController from '../controllers/login.controller';
import { validateLogin } from '../middlewares/validation.middleware';

const loginController = new LoginController();

const router = Router();

router.post('/', validateLogin, (req, res) => loginController.signIn(req, res));

export default router;
