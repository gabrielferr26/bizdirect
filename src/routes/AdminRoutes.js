const express = require('express');
const router = express.Router();
const multer = require('multer')
const multerConfig = require('../config/multer')
const middlewareLogin = require('../middlewares/middlewareLogin')


//Importação dos Controladores
const UserController = require('../controllers/FuncionarioController')
const CompetenciaController = require('../controllers/CompetenciaController')
const InteresseController = require('../controllers/InteresseController')
const ProjetoControllers = require('../controllers/ProjetoController')
const CategoriaController = require('../controllers/CategoriaController');
const CargoController = require('../controllers/CargosController')
const HabilitacaoController = require('../controllers/HabilitacoesController');


router.post('/adicionar/user', multer(multerConfig).single('file'), UserController.CriarUser)
router.post('/adicionar/skill', CompetenciaController.CriarCompetencia)
router.post('/adicionar/interesse', InteresseController.AdicionarInteresse)
router.post('/eliminar/interesse', InteresseController.ApagarInteresse)
router.post('/eliminar/skill', CompetenciaController.ApagarSkill)
router.post('/adicionar/projeto', ProjetoControllers.AdicionarProjeto)
router.post('/adicionar/tipohabilitacao', HabilitacaoController.AdicionarTipoHabilitacao)
router.post('/eliminar/user/:id', UserController.DeleteFuncionario)


module.exports = router