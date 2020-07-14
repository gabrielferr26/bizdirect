const Sequelize = require('sequelize');
const sequelize = require('./Database');

const User = require('./User');
const UserSkill = require('./UserSkill');

const Avaliacao = sequelize.define('avaliacoes', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    quemAvaliou: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
},
    {
        timestamps: false,

    });


UserSkill.hasMany(Avaliacao)
module.exports = Avaliacao