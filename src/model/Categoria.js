const Sequelize = require('sequelize')
const sequelize = require('./Database');


const Categoria = sequelize.define('categorias', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoria: Sequelize.STRING
},
    {
        timestamps: false
    })


module.exports = Categoria