const Sequelize = require('sequelize');
const sequelize = require('./Database');



const Projeto = sequelize.define('projetos', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    cliente: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.TEXT,
    },

    inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },

    fim: {
        type: Sequelize.DATEONLY,
        allowNull: false

    },

    estado: {
        type: Sequelize.BOOLEAN,
    }

},
    {
        timestamps: false
    });



    
module.exports = Projeto;
