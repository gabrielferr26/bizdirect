const Sequelize = require('sequelize')
const sequelize = require('./Database');



const Interesse = sequelize.define('interesse', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    interesse: {
        type: Sequelize.STRING,
    },
},
    {
        timestamps: false
    })



module.exports = Interesse