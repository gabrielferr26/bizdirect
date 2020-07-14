const Sequelize = require('sequelize')
const sequelize = require('./Database')

//Importação dos Models

const Team = require('./Team');
const User = require('./User');

var UserTeam = sequelize.define('user_teams', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    //teamLeadId: Sequelize.INTEGER
},
    {
        timestamps: false
    })



User.belongsToMany(Team, { through: 'user_teams', foreignKey: 'userId', otherKey: 'teamId' });
Team.belongsToMany(User, { through: 'user_teams', foreignKey: 'teamId', otherKey: 'userId' });
User.hasMany(UserTeam);
UserTeam.belongsTo(User);
Team.hasMany(UserTeam);
UserTeam.belongsTo(Team);


module.exports = UserTeam