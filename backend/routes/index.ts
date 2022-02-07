import { Router } from 'express';
const channelRouter = require('./channel');
const userRouter = require('./user');

const router = Router();

router.use('/channels', channelRouter);
router.use('/users', userRouter);

module.exports = router;
