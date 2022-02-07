import { Model } from 'objection';
const BaseModel = require('./BaseModel');

export class UserChannel extends BaseModel {
  static get tableName() {
    return 'user_channel';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Channel = require('./Channel');
    const User = require('./User');

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'user_channel.user_id',
        },
      },
      channel: {
        relation: Model.HasOneRelation,
        modelClass: Channel,
        join: {
          from: 'channels.id',
          to: 'user_channel.channel_id',
        },
      },
    };
  }
}

module.exports = UserChannel;
