const express = require('express');
const router = express.Router();
const multer = require('multer')
const multerConfig = require('../config/multer')
const middlewareLogin = require('../middlewares/middlewareLogin')


//Importação dos Controladores
const UserController = require('../controllers/FuncionarioController')
const CompetenciaController = require('../controllers/CompetenciaController')
const InteresseController = require('../controllers/InteresseController')
const ProjetoController = require('../controllers/ProjetoController')
const CategoriaController = require('../controllers/CategoriaController');
const CargoController = require('../controllers/CargosController')
const HabilitacaoController = require('../controllers/HabilitacoesController');
const Projeto = require('../model/Projeto');


//Gerar uma Equipa
router.post('/criar/equipa', ProjetoController.Equipa)
router.get('/novaequipa/:id', ProjetoController.NovaEquipa)
router.get('/equipa/projetos/users/:id', ProjetoController.UsersProjeto)
router.post('/eliminar/equipa/projeto', ProjetoController.DeleteProjeto)
router.post('/eliminar/equipa/projeto/user', ProjetoController.DeleteUser)
router.post('/adicionar/equipa/projeto/user', ProjetoController.AdicionarUserTeam)
router.post('/update/estado/projeto', ProjetoController.UpdateEstadoProjeto)

module.exports = router