var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'dcfjbb5cnar7no',
    'tnpjtbbvplvvua',
    '99ff61c6f0a6b36980374b8f784b6870963b6c33a457d1faf7ba0d4cbeed9413',

    {
        host: 'ec2-34-230-149-169.compute-1.amazonaws.com',
        port: '5432',
        dialect: 'postgres'
    }
);

module.exports = sequelize;