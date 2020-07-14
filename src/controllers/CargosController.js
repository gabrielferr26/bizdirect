const sequelize = require('../model/Database');
const Funcionario = require('../model/User')
const Cargo = require('../model/Cargo')

const controllers = {}
sequelize.sync()


//Lista de Cargos
controllers.ListaCargos = async (req, res) => {

    try {
        const data = await Cargo.findAll({})
        res.json({ success: true, data: data });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
};

module.exports = controllers