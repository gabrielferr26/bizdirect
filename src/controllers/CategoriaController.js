const sequelize = require('../model/Database');
const Competencia = require('../model/Skill')
const Categoria = require('../model/Categoria')

const controllers = {}
sequelize.sync()

//Adicionar Categoria
controllers.AdicionarCategoria = async (req, res) => {
    try {
        const { categoria } = req.body;
        const data = await Categoria.create({
            categoria: categoria
        })

        return res.status(200).json({ success: true, message: 'Registado', data: data });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}

//Lista de Categorias
controllers.ListaCategorias = async (req, res) => {
    const data = await Categoria.findAll({
    })
        .then(function (data) {
            return data;
        })

        .catch(error => {
            return error;
        });

    res.json({ success: true, data: data });
};

module.exports = controllers