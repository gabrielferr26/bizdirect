const Sequelize = require('sequelize');
const sequelize = require('./Database');

const Cargo = sequelize.define('cargos', {
    cargo: Sequelize.STRING
},
    {
        timestamps: false,

    });

module.exports = Cargo