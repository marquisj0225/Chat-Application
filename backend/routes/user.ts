import { Router } from 'express';
import * as UserController from '../controllers/UserController';
const router = Router();

router.get('/', UserController.getUsers);

module.exports = router;
