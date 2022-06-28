const Waterline = require('waterline');
const sailsDiskAdapter = require('sails-disk');
const sailsMysqlAdapter = require('sails-mysql');
const sailsMongoAdapter = require('sails-mongo');

const waterline = new Waterline();

const userMySql = process.env.DB_MYSQL_USER;
const passwordMySql = process.env.DB_MYSQL_PASSWORD;
const hostMySql = process.env.DB_MYSQL_HOST;
const portMySql = process.env.DB_MYSQL_PORT;
const databaseMySql = process.env.DB_MYSQL_NAME;

const userMongo = process.env.DB_MONGO_USER;
const passwordMongo = process.env.DB_MONGO_PASSWORD;
const hostMongo = process.env.DB_MONGO_HOST;
const portMongo = process.env.DB_MONGO_PORT;
const databaseMongo = process.env.DB_MONGO_NAME;

const config = {
    adapters: {
        'disk': sailsDiskAdapter,
        'mysql': sailsMysqlAdapter,
        'mongo': sailsMongoAdapter
    },

    datastores: {
        default: {
            adapter: 'disk',
        },
        mysql: {
            adapter: 'mysql',
            url: `mysql://${userMySql}:${passwordMySql}@${hostMySql}:${portMySql}/${databaseMySql}`
        },
        mongo: {
            adapter: 'mongo',
            url: `mongodb://${userMongo}:${passwordMongo}@${hostMongo}:${portMongo}/${databaseMongo}?authMechanism=DEFAULT`
        }
    }
}

module.exports = {
    waterline,
    config
};
