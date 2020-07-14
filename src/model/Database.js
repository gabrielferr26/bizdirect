var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'Teams',
    'postgres',
    '1234gabriel',

    {
        host: 'localhost',
        port: '5433',
        dialect: 'postgres'
    }
);

module.exports = sequelize;