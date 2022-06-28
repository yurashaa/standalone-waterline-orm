const Waterline = require('waterline');
const _ = require('lodash');

const { waterline } = require('../config');

const PetModel = Waterline.Collection.extend({
    tableName: 'pets',
    identity: 'pet',
    datastore: 'mysql',
    primaryKey: 'id',

    attributes: {
        id: {
            type: 'string',
            autoMigrations: {
                unique: true,
                autoIncrement: true
            }
        },
        type: { type:'string' },
        name: { type:'string' },
        createdAt: { type: 'string', autoCreatedAt: true },
        updatedAt: { type: 'string', autoUpdatedAt: true },

        // Add a reference to User
        owner: {
            model: 'user',
        }
    },

    beforeCreate: async function (valuesToSet, proceed) {
        /**
         * waterline 'datetime' is broken for 'sails-mysql' adapter
         * need to set values of 'createdAt' and 'updatedAt' manually
         */
        valuesToSet.createdAt = new Date(valuesToSet.createdAt);
        valuesToSet.updatedAt = new Date(valuesToSet.updatedAt);
        return proceed();
    },

    beforeUpdate: function (valuesToSet, proceed) {
        valuesToSet.updatedAt = new Date(valuesToSet.updatedAt);
        return proceed();
    }
});

waterline.registerModel(PetModel);

module.exports = {
    PetModel
}
