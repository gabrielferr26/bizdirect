const sequelize = require('../model/Database');
const Cargo = require('../model/Cargo')
const User = require('../model/User');
const Skill = require('../model/Skill')
const UserSkill = require('../model/UserSkill')
const Projeto = require('../model/Projeto')
const Interesse = require('../model/Interesse');
const Habilitacao = require('../model/Habilitacao');
const Curso = require('../model/Curso');
const Team = require('../model/Team');
const UserTeam = require('../model/UserTeam')


const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/config');
const UserInteresse = require('../model/UserInteresse');




const controllers = {}
sequelize.sync()


//Mostrar um Dado User
controllers.MostrarUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findAll({
            where: { id: id },
            attributes: ['id', 'nome', 'nif', 'avatarURL', 'email', 'telemovel', 'nacionalidade', 'morada', 'sobre', 'estado', 'anos_experiencia'],
            include: [
                { model: Cargo, attributes: ['cargo'] },
            ],

        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}


//Mostrar Skills de um Dado User
controllers.MostrarSkills = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await UserSkill.findAll({
            where: { userId: id },
            include: { model: Skill, attributes: ['skill'] }
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}


//Mostrar Interesses de um Dado User
controllers.MostrarInteresses = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await UserInteresse.findAll({
            where: { userId: id },
            attributes: [],
            include: { model: Interesse, attributes: ['interesse'] }
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}


//Mostrar Habilitacao de um Dado User
controllers.MostrarHabilitacao = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Habilitacao.findAll({
            attributes: ['instituicao', 'nomecurso'],
            where: { userId: id },
            include: [{ model: Curso, attributes: ['curso'] }]
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Mostrar Projetos de um Dado User
controllers.MostrarProjetos = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Team.findAll({

            include: [{
                model: Projeto
            },
            {
                model: UserTeam,
                where: { userId: id },
                attributes: []
            },
            {
                model: User,
                attributes: ['id', 'nome', 'avatarURL'],
                include: { model: Cargo }
            }]
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}

//Lista de Todos os Users
controllers.ListaUsers = async (req, res) => {
    try {
        const data = await User.findAll({
            include: [{
                model: Cargo
            }, {
                model: Skill,

            }],
            order: sequelize.random()
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
};

//Lista de Team Lead
controllers.ListaTeamLead = async (req, res) => {
    try {
        const data = await User.findAll({
            include: [Cargo],
            where: { cargoId: 2 },
            order: sequelize.random(),
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
};

//Lista de Developers
controllers.ListaDevelopers = async (req, res) => {
    try {
        const data = await User.findAll({
            include: [Cargo],
            where: { cargoId: 3 },
            order: sequelize.random(),

        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
};

//Contagem de Users
controllers.ContarUsers = async (req, res) => {
    try {
        const data = await User.count({
            attributes: []

        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}


//Contagem de Users Disponiveis
controllers.ContarUsersDisponiveis = async (req, res) => {
    try {
        const data = await User.count({
            where: { estado: true }

        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}




//Adicionar um User
controllers.CriarUser = async (req, res) => {

    const { name, password, nif, email, phone, nacionality, address, cargo, interesseId, competenciaId, habilitacoes, valueSliders, anos } = req.body;
    //const { originalname: nome, size, key, location: url = "" } = req.file;
    //console.log(req.file)

    const user = await User.create({

        nome: name,
        password: password,
        /*avatar: nome,
        avatarSize: size,
        avatarKey: key,
        avatarURL: url,*/
        email: email,
        nif: nif,
        telemovel: phone,
        nacionalidade: nacionality,
        morada: address,
        cargoId: cargo,
        estado: false,
        anos_experiencia: anos

    })
        .then(function (user) {
            var associationPromises = []
            interesseId.forEach(function (interesse_Id) {
                associationPromises.push(UserInteresse.create({
                    userId: user.id,
                    interesseId: interesse_Id
                }))
            })

            competenciaId.map((competencia_Id, index) => {
                associationPromises.push(UserSkill.create({
                    userId: user.id,
                    skillId: competencia_Id,
                    nivelComp: valueSliders[index]
                }))

            })

            habilitacoes.forEach(function ({ strSelect, strCurso, strInstituicao }) {
                associationPromises.push(Habilitacao.create({
                    userId: user.id,
                    cursoId: strSelect,
                    nomecurso: strCurso,
                    instituicao: strInstituicao
                }))
            })

            return Sequelize.Promise.all(associationPromises)

        }).catch(error => {
            console.log("Erro" + error)
            return error
        })

    res.status(200).json({
        success: true,
        message: "Registado",
        data: user
    });

}


//Autenticação User
controllers.Login = async (req, res) => {
    if (req.body.email && req.body.password) {
        var email = req.body.email
        var password = req.body.password
    }

    var user = await User.findOne({ where: { email: email } })
        .then(function (data) {
            return data
        })
        .catch(error => {
            console.log("Erro:" + error)
            return error
        })

    if (password === null || typeof password === "undefined") {
        res.status(403).json({
            success: false,
            message: 'Campos em Branco'
        })
    }

    else {
        if (req.body.email && req.body.password && user) {
            const isMatch = bcrypt.compareSync(password, user.password)
            if (req.body.email === user.email && isMatch) {
                let token = jwt.sign({ email: req.body.email }, config.jwtSecret, { expiresIn: '1h' })

                res.json({ success: true, message: 'Autenticação Realizada com Sucesso', token: token, tipo: user.cargoId, id: user.id, nome: user.nome, avatar: user.avatarURL })
            }
            else {
                res.status(403).json({ success: false, message: 'Dados de Autenticação Inválidos' })
            }
        }

        else {
            res.status(400).json({ success: false, message: 'Erro qualquer' })
        }
    }
}

//Editar um User
//Adicionar um User
controllers.EditarUser = async (req, res) => {

    const { name, password, nif, email, phone, nacionality, address, cargo, interesseId, competenciaId, habilitacoes, valueSliders, anos, id, editLevelSkill, skillsId, descricao } = req.body;

    //const { originalname: nome, size, key, location: url = "" } = req.file;
    //console.log(req.file)

    const user = await User.update({
        where: { id: id },
        nome: name,
        password: password,
        /*avatar: nome,
        avatarSize: size,
        avatarKey: key,
        avatarURL: url,*/
        email: email,
        nif: nif,
        telemovel: phone,
        nacionalidade: nacionality,
        morada: address,
        cargoId: cargo,
        anos_experiencia: anos,
        sobre: descricao

    }, { where: { id: id } })
        .then(function (user) {
            var associationPromises = []
            interesseId.forEach(function (interesse_Id) {
                associationPromises.push(UserInteresse.create({
                    userId: id,
                    interesseId: interesse_Id
                }))
            })

            competenciaId.map((competencia_Id, index) => {
                associationPromises.push(UserSkill.create({
                    userId: id,
                    skillId: competencia_Id,
                    nivelComp: valueSliders[index]
                }))

            })

            skillsId.map((competencia_Id, index) => {
                associationPromises.push(UserSkill.update({
                    userId: id,
                    skillId: competencia_Id,
                    nivelComp: editLevelSkill[index]
                }))
            })


            habilitacoes.forEach(function ({ strSelect, strCurso, strInstituicao }) {
                associationPromises.push(Habilitacao.create({
                    userId: id,
                    cursoId: strSelect,
                    nomecurso: strCurso,
                    instituicao: strInstituicao
                }))
            })

            return Sequelize.Promise.all(associationPromises)

        }).catch(error => {
            console.log("Erro" + error)
            return error
        })

    res.status(200).json({
        success: true,
        message: "Registado",
        data: user
    });

}


//Eliminar um User
controllers.DeleteFuncionario = async (req, res) => {

    const { id } = req.params
    try {

        const deleteHabilitacao = await Habilitacao.destroy({
            where: {
                userId: id,
            }
        })

        console.log(req.params)
        const deleteUser = await User.destroy({
            where: {
                id: id,
            }
        })



        res.json({ success: true, deleted: deleteHabilitacao, message: "A Conta foi Eliminada" })
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}


module.exports = controllers