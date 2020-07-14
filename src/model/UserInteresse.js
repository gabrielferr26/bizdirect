const Sequelize = require('sequelize')
const sequelize = require('./Database')

//Importação dos Models

const Interesse = require('./Interesse');
const User = require('./User');

var UserInteresse = sequelize.define('user_interesse', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
},
    {
        timestamps: false
    })



User.belongsToMany(Interesse, { through: 'user_interesse', foreignKey: 'userId', otherKey: 'interesseId' });
Interesse.belongsToMany(User, { through: 'user_interesse', foreignKey: 'interesseId', otherKey: 'userId' });
User.hasMany(UserInteresse);
UserInteresse.belongsTo(User);
Interesse.hasMany(UserInteresse);
UserInteresse.belongsTo(Interesse);


module.exports = UserInteresse