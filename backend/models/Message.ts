import { Model } from 'objection';
const BaseModel = require('./BaseModel');

export class Message extends BaseModel {
  static get tableName() {
    return 'messages';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const User = require('./User');
    return {
      sender: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'messages.sender_user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Message;
