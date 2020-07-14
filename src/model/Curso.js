var Sequelize = require('sequelize')
var sequelize = require('./Database')

var Curso = sequelize.define('cursos', {
    curso: Sequelize.STRING
},
    {
        timestamps: false
    })

    module.exports = Curso