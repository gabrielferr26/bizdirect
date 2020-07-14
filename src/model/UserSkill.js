const Sequelize = require('sequelize')
const sequelize = require('./Database')

//Importação dos Models

const Skill = require('./Skill');
const User = require('./User');

var UserSkill = sequelize.define('user_skills', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nivelComp: {
        type: Sequelize.INTEGER
    }
},
    {
        timestamps: false
    })



User.belongsToMany(Skill, { through: 'user_skills', foreignKey: 'userId', otherKey: 'skillId' });
Skill.belongsToMany(User, { through: 'user_skills', foreignKey: 'skillId', otherKey: 'userId' });
User.hasMany(UserSkill);
UserSkill.belongsTo(User);
Skill.hasMany(UserSkill);
UserSkill.belongsTo(Skill);


module.exports = UserSkill