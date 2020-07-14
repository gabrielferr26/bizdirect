const sequelize = require('../model/Database');
const Curso = require('../model/Curso')

const controllers = {}
sequelize.sync()

controllers.AdicionarTipoHabilitacao = async (req, res) => {

    const { curso } = req.body;
    try {
        const data = await Curso.create({
            curso: curso
        })

        res.json({ success: true, message: 'Adicionado', data: data });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}

//Lista de Tipos de Habilitações
controllers.ListaCursos = async (req, res) => {
    try {
        const data = await Curso.findAll({})
        res.json({ success: true, data: data });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
};

module.exports = controllers