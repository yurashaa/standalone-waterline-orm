const Waterline = require('waterline');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const _ = require('lodash');

const { waterline } = require('../config');

const UserModel = Waterline.Collection.extend({
    tableName: 'users',
    migrate: 'safe',
    identity: 'user',
    datastore: 'mongo',
    primaryKey: 'id',

    attributes: {
        id: { type: 'string', columnName: '_id' },
        name: { type: 'string', required: true },
        email: { type: 'string', required: true },
        password: { type: 'string', required: true },
        rememberMeToken: { type: 'string' },
        createdAt: { type: 'string', autoCreatedAt: true },
        updatedAt: { type: 'string', autoUpdatedAt: true },

        // Add a reference to Pets
        pets: {
            collection: 'pet',
            via: 'owner'
        }
    },

    beforeCreate: async function (valuesToSet, proceed) {
        const salt = await bcrypt.genSalt(10);
        valuesToSet.password = await bcrypt.hash(valuesToSet.password, salt);

        /**
         * waterline 'datetime' is broken for 'sails-mongo' adapter
         * need to set values of 'createdAt' and 'updatedAt' manually
         */
        valuesToSet.createdAt = new Date(valuesToSet.createdAt);
        valuesToSet.updatedAt = new Date(valuesToSet.updatedAt);

        return proceed();
    },

    beforeUpdate: function (valuesToSet, proceed) {
        valuesToSet.updatedAt = new Date(valuesToSet.updatedAt);
        return proceed();
    },

    customToJSON: function () {
        return _.omit(this, ['password']);
    },
});

waterline.registerModel(UserModel);

module.exports = {
    UserModel
}