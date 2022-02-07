import { Request, Response, NextFunction } from 'express';

import { getCurrentUser } from './BaseController';
const Channel = require('../models/Channel');
const UserChannel = require('../models/UserChannel');
const Message = require('../models/Message');
const context = require('../context');

export async function getChannelMessages(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;

    const messages = await Channel.relatedQuery('messages').whereNotDeleted().withGraphFetched('[sender]').for(id);
    res.json(messages);
  } catch (err) {
    console.log(err);
    res.json({ err: err, mes: 'there was an error' });
  }
}

export async function createMessage(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    let message = req.body;
    const { id } = req.params;
    const user = await getCurrentUser(req);

    console.log(user.id, id);

    // Make sure user is part of channel before creating message
    const userChannel = await UserChannel.query().where('channel_id', id).where('user_id', user.id).first();

    if (!userChannel) throw new Error('Only users of the channel can perform this action.');

    message.sender_user_id = user.id;
    message.channel_id = id;

    const createdMessage = await Message.query().insertAndFetch(message);

    if (createdMessage) {
      context.io.emit(`channel-message-${id}`, createdMessage);
      res.json(createdMessage);
    } else {
      res.json({
        success: false,
        mes: 'Message was not created successfully.',
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ err: err, mes: 'there was an error' });
  }
}
