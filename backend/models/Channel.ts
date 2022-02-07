import { Model } from 'objection';
const BaseModel = require('./BaseModel');

export class Channel extends BaseModel {
  static get tableName() {
    return 'channels';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const UserChannel = require('./UserChannel');
    const Message = require('./Message');

    return {
      channel_users: {
        relation: Model.HasManyRelation,
        modelClass: UserChannel,
        join: {
          from: 'channels.id',
          to: 'user_channel.channel_id',
        },
      },
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'channels.id',
          to: 'messages.channel_id',
        },
      },
    };
  }
}

module.exports = Channel;
