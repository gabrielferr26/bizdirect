const Sequelize = require('sequelize');
const sequelize = require('./Database');
const bcrypt = require('bcrypt')
const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const s3 = new aws.S3()

const Cargo = require('./Cargo')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nome: {
        type: Sequelize.STRING,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
        select: false
    },

    nif: {
        type: Sequelize.STRING,
    },

    avatar: Sequelize.STRING,
    avatarKey: Sequelize.STRING,
    avatarSize: Sequelize.INTEGER,
    avatarURL: Sequelize.STRING,

    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false

    },

    telemovel: {
        type: Sequelize.STRING,

    },

    nacionalidade: {
        type: Sequelize.STRING,
    },

    morada: {
        type: Sequelize.STRING
    },

    sobre: {
        type: Sequelize.STRING
    },

    anos_experiencia: Sequelize.INTEGER,

    cargoId: {
        type: Sequelize.INTEGER,
        references: {
            model: Cargo,
            key: 'id',
        }
    },

    estado: Sequelize.BOOLEAN
},
    {
        timestamps: false,

    });


User.belongsTo(Cargo);




//Gerar Hash na Password
User.beforeCreate((funcionario, options) => {
    return bcrypt.hash(funcionario.password, 10)
        .then(hash => {
            funcionario.password = hash
        })
        .catch(err => {
            throw new Error()
        })
})


//Gerar Unique Key da Imagem do Utilizador
User.beforeCreate((funcionario, options) => {
    if (!funcionario.avatarURL) {
        funcionario.avatarURL = `${process.env.APP_URL}/files/${funcionario.avatarKey}`
    }
})

//Antes de Eliminar Funcionario Eliminar Fotografia do S3
User.beforeBulkDestroy((funcionario, options) => {
    if (process.env.STORAGE_TYPE === "s3") {
        return s3.deleteObject({
            Bucket: "uploadimagens3",
            Key: funcionario.avatarKey
        })
    }
    else {
        return promisify(fs.unlink)(path.resolve, "..", "..", "src", "tmp", "uploads")
    }
})

module.exports = User;