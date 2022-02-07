import { Router } from 'express';
import * as ChannelController from '../controllers/ChannelController';
import * as MessageController from '../controllers/MessageController';
const router = Router();

router.get('/', ChannelController.getUserChannels);
router.get('/search', ChannelController.searchChannels);
router.get('/:id', ChannelController.getChannel);
router.post('/:id/join', ChannelController.joinChannel);
router.post('/', ChannelController.createChannel);
router.delete('/:id', ChannelController.deleteChannel);

router.get('/:id/messages', MessageController.getChannelMessages);
router.post('/:id/messages', MessageController.createMessage);

module.exports = router;
