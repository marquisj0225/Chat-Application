import { Request, Response, NextFunction } from 'express';
const { raw } = require('objection');
import { getCurrentUser } from './BaseController';
const UserChannel = require('../models/UserChannel');
const Channel = require('../models/Channel');

export async function getUserChannels(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await getCurrentUser(req);
    const subQuery = UserChannel.query().where('user_id', user.id);
    const channels = await UserChannel.relatedQuery('channel').whereNotDeleted().for(subQuery);
    res.json(channels);
  } catch (err) {
    console.log(err);
    res.json({ err: err, mes: 'there was an error' });
  }
}

export async function getChannel(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const channel = await Channel.query().whereNotDeleted().findById(id);
    res.json(channel);
  } catch (err) {
    console.log(err);
    res.json({ err: err, mes: 'there was an error' });
  }
}

export async function searchChannels(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {

    const user = await getCurrentUser(req);
    const query = req.query.q || '';
    const channels = await Channel.query()
      .whereNotDeleted()
      .where(raw('LOWER(name)'), 'like', `%${query.toLowerCase()}%`)
      .whereNotIn('id', UserChannel.query().select('user_channel.channel_id').where('user_channel.user_id', user.id));

    res.json(channels);
  } catch (err) {
    console.log(err);
    res.json({ err: err, mes: 'there was an error' });
  }
}

export async function joinChannel(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await getCurrentUser(req);
    const { id } = req.params;

    const channelJoin = await UserChannel.query().where('channel_id', id).where('user_id', user.id).first();

    if (!channelJoin) {
      await UserChannel.query().insert({ user_id: user.id, channel_id: id });
      const channel = await Channel.query().whereNotDeleted().findById(id);

      res.json(channel);
    }
  } catch (err) {
    console.log(err);
    res.json({ err: err, mes: 'there was an error' });
  }
}

export async function createChannel(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    let channel = req.body;
    const user = await getCurrentUser(req);
    channel.creator_user_id = user.id;

    await Channel.transaction(async (tx) => {
      const createdChannel = await Channel.query(tx).insertAndFetch(channel);

      if (createdChannel) {
        await Channel.relatedQuery('channel_users', tx)
          .for(createdChannel.id)
          .insert({ user_id: user.id, channel_id: createdChannel.id });
        res.json(createdChannel);
      } else {
        res.json({
          success: false,
          mes: 'Channel was not created successfully.',
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ err: err, mes: 'there was an error' });
  }
}

export async function deleteChannel(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await getCurrentUser(req);

    // Make sure user is creator of channel before deleting
    const channel = await Channel.query().whereNotDeleted().where('id', id).where('creator_user_id', user.id).first();
    if (!channel) throw new Error('Only creator of the channel can perform this action.');

    await Channel.query().deleteById(id);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.json({ err: err, mes: 'there was an error' });
  }
}
