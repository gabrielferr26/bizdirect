const sequelize = require('../model/Database');

const Interesse = require('../model/Interesse')
const FuncionariosInteresse = require('../model/UserInteresse')
const Funcionario = require('../model/User');
const User = require('../model/User');

const controllers = {}
sequelize.sync()




//Adicionar Interesse
controllers.AdicionarInteresse = async (req, res) => {

    try {
        const { interesse } = req.body;
        const data = await Interesse.create({
            interesse: interesse,
        })

        return res.status(200).json({ success: true, message: 'Interesse Registado', data: data });
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}

//Apagar Interesse
controllers.ApagarInteresse = async (req, res) => {

    const { id } = req.body;
    try {
        const del = await Interesse.destroy({
            where: { id: id }
        })

        res.json({ success: true, deleted: del, message: "Deleted"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}


//Contar Interesses
controllers.ContarInteresses = async (req, res) => {
    try {
        const data = await Interesse.count({ attributes: [] })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Lista de Interesses
controllers.ListaInteresses = async (req, res) => {
    try {
        const data = await Interesse.findAll()

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}


//Mostrar um Dado Interesse
controllers.MostrarInteresse = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Interesse.findOne({
            where: { id: id }
        })

        return res.status(200).json({ success: true, message: 'Done', data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}


//Contagem de Users com Dado Interesse
controllers.InteresseUsers = async (req, res) => {

    const { id } = req.params
    try {
        const data = await User.count({
            attributes: [],
            include: {
                model: Interesse,
                where: { id: id },
                attributes: ['interesse']
            }

        })

        return res.status(200).json({ success: true, message: 'Done', data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Users com um Dado Interesse
controllers.UsersInteresses = async (req, res) => {

    const { id } = req.params
    try {
        const data = await User.findAll({
            include: {
                model: Interesse,
                where: { id: id },
            }
        })

        return res.status(200).json({ success: true, message: 'Done', data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}































//Editar um dado Interesse
controllers.EditarInteresse = async (req, res) => {
    const { id } = req.params;
    const { interesse } = req.body;
    //Atualziar Info

    const data = await Interesse.update({
        interesse: interesse,
    },
        { where: { id: id } })

        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "O Interesse " + interesse + "foi atualizado" })
}



//Mostrar Interesses de um Dado Funcionario
controllers.InteressesFuncionarios = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Funcionario.findAll({
            attributes: ['id'],
            where: { id: id },
            include: {
                model: Interesse,
                as: 'hobbies',
                through: { attributes: [] }
            }
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {

        return res.status(500).json({ err })
    }

};

controllers.get = async (req, res) => {
    const { id } = req.params;
    const data = await FuncionariosInteresse.findAll({

        include: [{ model: Funcionario }, { model: Interesse }],
        where: { interesseId: id }
    })

        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });

    res.json({ success: true, data: data });
}

module.exports = controllers
