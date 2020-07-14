const Sequelize = require('sequelize');
const sequelize = require('./Database');

//Importação dos Models
const Categoria = require('./Categoria')

const Skill = sequelize.define('skills', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    skill: {
        type: Sequelize.STRING,
    },

    categoriaId: {
        type: Sequelize.INTEGER,
        references: {
            model: Categoria,
            key: 'id',
        }
    },
},
    {
        timestamps: false
    });


Skill.belongsTo(Categoria);

module.exports = Skill;