import { Model } from 'objection';
import objectionSoftDelete from 'objection-js-soft-delete';

// Specify the options for this plugin. This are the defaults.
const softDelete = objectionSoftDelete({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});

class BaseModel extends softDelete(Model) {}

module.exports = BaseModel;
