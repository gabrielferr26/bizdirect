const Sequelize = require('sequelize');
const sequelize = require('./Database');

const Projeto = require('./Projeto');


const Team = sequelize.define('teams', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
},
    {
        timestamps: false,

    });


Team.belongsTo(Projeto)


module.exports = Team

