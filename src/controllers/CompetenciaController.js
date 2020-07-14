const sequelize = require('../model/Database');
const Categoria = require('../model/Categoria')
const FuncionariosCompetencias = require('../model/UserSkill')
const User = require('../model/User');
const Skill = require('../model/Skill');
const UserSkill = require('../model/UserSkill');


const controllers = {}
sequelize.sync()

//Mostrar uma Competencia
controllers.MostrarCompetencia = async (req, res) => {
    try {
        const { id } = req.params
        const data = await User.findAll({
            include: {
                model: Skill,
                as: 'skills',
                where: { id: id }
            },
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Lista de Skills
controllers.ListaSkills = async (req, res) => {
    try {
        const data = await Skill.findAll({
            include: [{
                model: Categoria,
                attributes: ['categoria'],
            }]
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}


//Contar o Número de Skills
controllers.ContarSkills = async (req, res) => {
    try {
        const data = await Skill.count({
            attributes: []

        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Somas de todos os Niveis
controllers.SomaNiveis = async (req, res) => {
    try {
        const data = await UserSkill.sum('nivelComp');
        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Total de Niveis e Competencias
controllers.ContarUserSkills = async (req, res) => {
    try {
        const data = await UserSkill.count();
        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}

//Adicionar uma Competencia
controllers.CriarCompetencia = async (req, res) => {
    try {
        const { competencia, categoria } = req.body;
        const data = await Skill.create({
            skill: competencia,
            categoriaId: categoria
        })

        return res.status(200).json({ success: true, message: 'Registado', data: data });
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}


//Apagar Skill
controllers.ApagarSkill = async (req, res) => {

    const { id } = req.body;
    try {
        const del = await Skill.destroy({
            where: { id: id }
        })

        res.json({ success: true, deleted: del, message: "Eliminado" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}

//Informações de uma Skill
controllers.MostrarSkill2 = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Skill.findAll({
            where: { id: id },
            include:[Categoria]
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}


















//Lista de todas as Competencias
controllers.ListaCompetencias = async (req, res) => {
    const data = await Competencia.findAll({
        include: [Categoria]
    })

        .then(function (data) {
            return data;
        })

        .catch(error => {
            return error;
        });

    res.json({ success: true, data: data });
};




//Editar uma Competencia
controllers.EditarCompetencia = async (req, res) => {
    const { id } = req.params;
    const { competencia, categoria } = req.body;
    const data = await Competencia.update({
        competencia: competencia,
        categoriaId: categoria
    },
        { where: { id: id } })

        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "A Competência " + competencia + "foi atualizada" })
}

//Eliminar uma Competencia
controllers.EliminarCompetencia = async (req, res) => {
    const { id } = req.pa;
    const del = await Competencia.destroy({
        where: { id: id }
    })
        .catch(error => {
            console.log("Erro:" + error)
            return error
        })
    res.json({ success: true, deleted: del, message: "A Competência foi apagada" })
}

//Lista de Competencias e Total de Funcionarios P/Competencia
controllers.ListaCompetenciasFuncionario = async (req, res) => {
    const data = await FuncionariosCompetencias.findAll({
        where: { competenciaId: 2 },
        attributes: [
            'competenciaId',
            sequelize.fn('count', sequelize.col('competenciaId'))
        ],
        group: ['competenciaId']
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });

    res.json({ success: true, data: data });
}

//Lista de Competencias de um Determinado Funcionario
controllers.CompetenciasFuncionario = async (req, res) => {

    try {
        const { id } = req.params
        const data = await Funcionario.findAll({
            attributes: ['id', 'name'],
            where: { id: id },
            include: {
                model: Competencia,
                as: 'skills',
                through: { attributes: ['nivelcomp'] }
            }
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {

        return res.status(500).json({ err })
    }
};

//Mostrar uma dada Skill
controllers.MostrarSkill = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Skill.findOne({
            where: { id: id }
        })

        return res.status(200).json({ success: true, message: 'Done', data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}


//Contagem de Users com Dada Skill
controllers.SkillUsers = async (req, res) => {

    const { id } = req.params
    try {
        const data = await User.count({
            attributes: [],
            include: {
                model: Skill,
                where: { id: id },
                attributes: ['skill']
            }

        })

        return res.status(200).json({ success: true, message: 'Done', data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Users com um Dada Skill
controllers.UsersSkill = async (req, res) => {

    const { id } = req.params
    try {
        const data = await User.findAll({
            include: {
                model: Skill,
                where: { id: id },
            }
        })

        return res.status(200).json({ success: true, message: 'Done', data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

module.exports = controllers