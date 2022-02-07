import { Model } from 'objection';
const BaseModel = require('./BaseModel');

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Channel = require('./Channel');

    return {
      channels: {
        relation: Model.ManyToManyRelation,
        modelClass: Channel,
        join: {
          from: 'users.id',
          through: {
            // user_channel is the join table.
            from: 'user_channel.user_id',
            to: 'user_channel.channel_id',
          },
          to: 'channels.id',
        },
      },
    };
  }
}

module.exports = User;
