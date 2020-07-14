const Sequelize = require('sequelize')
const sequelize = require('./Database')

//Importação dos Models

const Cursos = require('./Curso')
const User = require('./User')

const Habilitacao = sequelize.define('habilitacoes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    instituicao: {
        type: Sequelize.STRING
    },
    nomecurso: {
        type: Sequelize.STRING
    },
    cursoId: {
        type: Sequelize.INTEGER,
        references: {
            model: Cursos,
            key: 'id',
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }

},
    {
        timestamps: false
    })


Habilitacao.belongsTo(Cursos)
Habilitacao.belongsTo(User)

module.exports = Habilitacao;