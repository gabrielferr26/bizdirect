const sequelize = require('../model/Database');
const Projeto = require('../model/Projeto')
const User = require('../model/User')
const Cargo = require('../model/Cargo');
const Skill = require('../model/Skill');
const UserSkill = require('../model/UserSkill');
const UserTeam = require('../model/UserTeam');
const Team = require('../model/Team')
const Avaliacao = require('../model/Avaliação');
const { Op, Sequelize } = require("sequelize");
const UserInteresse = require('../model/UserInteresse');
const Interesse = require('../model/Interesse');


const controllers = {}
sequelize.sync()

//Lista de Projetos
controllers.ListaProjetos = async (req, res) => {
    try {
        const data = await Team.findAll({

            include: [{
                model: Projeto
            },
            {
                model: UserTeam,
                attributes: []
            },
            {
                model: User,
                attributes: ['id', 'nome', 'avatarURL'],
                include: { model: Cargo, attributes: ['cargo', 'id'] }
            }]
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}

//Motrar um Dado Projeto
controllers.MostrarProjeto = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Team.findAll({

            include: [{
                model: Projeto,
                where: { id: id },
            },
            {
                model: UserTeam,
                attributes: []
            },
            {
                model: User,
                attributes: ['id', 'nome', 'avatarURL'],
                include: { model: Cargo, attributes: ['cargo'] }
            }]
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Mostrar os Users de um Projeto
controllers.MostrarUsersProjeto = async (req, res) => {
    try {
        const data = await UserTeam.findAll({

            include: [{
                model: User,
                include: [{ model: Cargo }],
                attributes: ['nome', 'avatarURL', 'email', 'id']
            }],
            order: sequelize.random()
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Mostrar Equipa, Projeto e Users
controllers.MostrarEquipa = async (req, res) => {
    try {
        const data = await Team.findAll({
            include: [Projeto, User],
            order: ['nome']
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Contar o Número de Equipas e Projetos
controllers.ContarProjetos = async (req, res) => {

    try {
        const data = await Team.count({
            attributes: []

        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}



// Criar Equipa Random
controllers.Equipa = async (req, res) => {

    const { selectSkill, selectInteresses, selectElementos, nomeProjeto, nomeEquipa, inicio, fim, cliente, descricao, idTeamLead } = req.body
    console.log(req.body)

    const projeto = await Projeto.create({
        nome: nomeProjeto,
        cliente: cliente,
        descricao: descricao,
        inicio: inicio,
        fim: fim,
        estado: false

    })

    const users = await User.findAll({
        attributes: ['id'],
        where: { estado: true },
        include: [{
            model: Cargo,
            attributes: ['cargo'],
            where: { id: 3 }
        }, {
            required: true,
            model: UserSkill,
            attributes: ['nivelComp'],
            where: {
                skillId: selectSkill,
                nivelComp: {
                    [Op.between]: [50, 100]
                }
            },
            include: [{
                model: Skill,
                attributes: ['skill'],
            },
            {
                model: Avaliacao,
            }],
        }, {
            required: false,
            model: UserInteresse,
            where: {
                interesseId: selectInteresses
            },

            include: {
                model: Interesse
            }
        }],
        limit: selectElementos,
        order: sequelize.random()
    })

    const team = await Team.create({
        nome: nomeEquipa,
        projetoId: projeto.id
    })

    const userlead = await UserTeam.create({
        teamId: team.id,
        userId: idTeamLead
    })

        .then(function () {
            var associationPromises = []
            users.forEach(function (user_Id) {
                associationPromises.push(UserTeam.create({
                    teamId: team.id,
                    userId: user_Id.id
                }))
            })

            users.forEach(function (user_Id) {
                User.update({
                    estado: false
                },
                    { where: { id: user_Id.id } })
            })

            return Sequelize.Promise.all(associationPromises)

        })

        .catch(error => {
            console.log("Erro" + error)
            return error
        })

    res.status(200).json({
        success: true,
        message: "Registado",
        data: projeto

    });
}



//Motrar um Dado Projeto
controllers.NovaEquipa = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Team.findAll({
            include: [{
                model: Projeto,
                where: { id: id },
            }]
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Users de uma Nova Equipa / Projeto
controllers.UsersProjeto = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Team.findAll({
            attributes: [],
            where: { projetoId: id },
            include: [
                {
                    model: UserTeam,
                    attributes: []
                },
                {
                    model: User,
                    attributes: ['id', 'nome', 'avatarURL'],
                    include: [Cargo, Skill]
                }]
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Eliminar Projeto 
controllers.DeleteProjeto = async (req, res) => {

    const { id, idEquipa, idUser } = req.body
    console.log(req.body)

    try {
        const del = await Projeto.destroy({
            where: { id: id }
        })

        const deletee = await Team.destroy({
            where: { id: idEquipa }
        })

        User.update({
            estado: true
        },
            { where: { id: idUser } })

        res.json({ success: true, deleted: del, message: "Projeto Eliminado" })
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }

}

//Eliminar um User de uma Equipa
controllers.DeleteUser = async (req, res) => {
    try {
        const { id, idEquipa } = req.body
        console.log(req.body)
        const deleteUser = await UserTeam.destroy({
            where: {
                userId: id,
                teamId: idEquipa
            }
        })

        const trueUser = await User.update({
            estado: true
        }, {
            where: { id: id }
        })

        res.json({ success: true, deleted: deleteUser, message: "User Retirado" })
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Adicionar Utilizador a uma Equipa
controllers.AdicionarUserTeam = async (req, res) => {
    try {
        const { id, idEquipa } = req.body
        const user = await UserTeam.create({
            userId: id,
            teamId: idEquipa
        })

        const trueUser = await User.update({
            estado: false
        }, { where: { id: id } })

        return res.status(200).json({ success: true, data: user });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

// Numero de Projetos em Curso
controllers.ContarProjetosCurso = async (req, res) => {
    try {
        const data = await Projeto.count({
            where: { estado: false }
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Ultimos Projetos Adicionados
controllers.UltimosProjetos = async (req, res) => {
    try {
        const data = await Team.findAll({
            include: [{
                model: Projeto,
                order: [['inicio', 'DESC']],
            },
            {
                model: UserTeam,
                attributes: [],
            },
            {
                model: User,
                attributes: ['id', 'nome', 'avatarURL'],
                include: { model: Cargo, attributes: ['cargo', 'id'] },

            }],
            order: [[Projeto, 'inicio', 'DESC']],
            limit: 5
        })

        return res.status(200).json({ success: true, data: data });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

//Adicionar um Projeto
controllers.AdicionarProjeto = async (req, res) => {
    const { nomeProjeto, nomeEquipa, cliente, descricao, inicio, fim, teamLead, funcionarios } = req.body

    const projeto = await Projeto.create({
        nome: nomeProjeto,
        cliente: cliente,
        descricao: descricao,
        inicio: inicio,
        fim: fim,
        estado: true
    })

    const team = await Team.create({
        nome: nomeEquipa,
        projetoId: projeto.id
    })

    const userteam = await UserTeam.create({
        userId: teamLead,
        teamId: team.id
    })

        .then(function () {
            var associationPromises = []
            funcionarios.forEach(function (funcionario_Id) {
                associationPromises.push(UserTeam.create({
                    teamId: team.id,
                    userId: funcionario_Id,
                }))
            })
            return Sequelize.Promise.all(associationPromises)
        })


        .catch(error => {
            console.log("Erro" + error)
            return error
        })




    res.status(200).json({
        success: true,
        message: "Registado",
        data: projeto
    });
}

//Atualizar Estado de um Projeto
controllers.UpdateEstadoProjeto = async (req, res) => {

    const { id, idUser } = req.body
    try {
        const updateestado = await Projeto.update({
            estado: true
        }, { where: { id: id } })

        const updateUser = await User.update({
            estado: true
        },
            { where: { id: idUser } }
        )

        return res.status(200).json({ success: true, data: updateestado });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}


controllers.UpdateEstadoUser = async (req, res) => {

    const { idUser } = req.body
    try {
        const updateestado = await Projeto.update({
            estado: true
        }, { where: { id: id } })

        const updateUser = await User.update({
            estado: true
        }, { where: { id: idUser } })

        return res.status(200).json({ success: true, data: updateestado, updateUser });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}











































//Projetos de um Funcionario + Elementos desse Projeto



//Listagem de Projetos com Limite de um Dado Funcionario
controllers.ProjetosLimiteFuncionarios = async (req, res) => {
    const { id } = req.params;
    const data = await FuncionarioProjetos.findAll({
        where: { employeeId: id },
        include: [Funcionario, Projeto],
        limit: 3,
        order: sequelize.random()
    })

        .then(function (data) {
            return data;
        })

        .catch(error => {
            return error;
        });

    res.json({ success: true, data: data });

}

//Mostrar Team Lead de um Dado Projeto
controllers.TeamLeadProjeto = async (req, res) => {
    const { id } = req.params;
    const data = await FuncionarioProjetos.findAll({
        where: { projetoId: id },
        include: {
            model: Funcionario,
            as: 'employee',
            where: { cargoid: 2 },
            include: {
                model: Cargo,
                as: 'cargo'
            }
        }
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });

    res.json({ success: true, data: data });
}



//Mostrar Nome de um Dado Projeto
controllers.NomeProjeto = async (req, res) => {
    const { id } = req.params;
    const data = await Projeto.findAll({
        where: { id: id },
        limit: 1
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });

    res.json({ success: true, data: data });
}



//Lista da Equipa de um dado Projeto
controllers.EquipaProjeto = async (req, res) => {

    const { id } = req.params;
    const data = await FuncionarioProjetos.findAll({
        include: [Funcionario, Projeto]



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

