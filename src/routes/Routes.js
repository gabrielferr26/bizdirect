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


//Autenticação
router.post('/login', UserController.Login)

//Rotas de Acesso Geral
router.get('/user/:id', UserController.MostrarUser)
router.get('/user/habilitacao/:id', UserController.MostrarHabilitacao)
router.get('/user/projetos/:id', UserController.MostrarProjetos)
router.get('/user/skills/:id', UserController.MostrarSkills)
router.get('/user/interesses/:id', UserController.MostrarInteresses)
router.get('/lista/users', UserController.ListaUsers)
router.get('/lista/teamlead', UserController.ListaTeamLead)
router.get('/lista/developers', UserController.ListaDevelopers)
router.get('/lista/projetos', ProjetoController.ListaProjetos)
router.get('/lista/cargos', CargoController.ListaCargos)
router.get('/projeto/:id', ProjetoController.MostrarProjeto)
router.get('/lista/projetos/users', ProjetoController.MostrarUsersProjeto)
router.get('/lista/equipas', ProjetoController.MostrarEquipa)
router.get('/lista/cursos', HabilitacaoController.ListaCursos)
router.get('/contagem/projetos', ProjetoController.ContarProjetos)
router.get('/contagem/projetos/curso', ProjetoController.ContarProjetosCurso)
router.get('/contagem/skills', CompetenciaController.ContarSkills)
router.get('/contagem/interesses', InteresseController.ContarInteresses)
router.get('/contagem/users', UserController.ContarUsers)
router.get('/contagem/users/disponiveis', UserController.ContarUsersDisponiveis)
router.get('/soma/skills', CompetenciaController.SomaNiveis)
router.get('/lista/skills', CompetenciaController.ListaSkills)
router.get('/lista/interesses', InteresseController.ListaInteresses)
router.get('/total/userskills', CompetenciaController.ContarUserSkills)
router.post('/adicionar/categoria', CategoriaController.AdicionarCategoria)
router.get('/lista/categorias', CategoriaController.ListaCategorias)
router.get('/totalusers/interesse/:id', InteresseController.InteresseUsers)
router.get('/interesse/:id', InteresseController.MostrarInteresse)
router.get('/interesse/total/users/:id', InteresseController.UsersInteresses)
router.get('/totalusers/skill/:id', CompetenciaController.SkillUsers)
router.get('/skill/:id', CompetenciaController.MostrarSkill)
router.get('/skill/total/users/:id', CompetenciaController.UsersSkill)
router.get('/lista/projetos/novos', ProjetoController.UltimosProjetos)
router.get('/info/skill/:id', CompetenciaController.MostrarSkill2)
router.post('/editar/user/:id', multer(multerConfig).single('file'), UserController.EditarUser)





















//Rotas de Admin

//Adicionar Funcionario
/*router.post('/adicionar/funcionario', multer(multerConfig).single('file'), FuncionarioController.CriarFuncionario)
//Eliminar Funcionario
router.delete('/eliminar/funcionario/:id', FuncionarioController.EliminarFuncionario)
//Adicionar Competencia

//Adicionar Projeto

//Adicionar Categoria

//Adicionar Tipo Habilitação

//Adicionar Equipa

//Adicionar Interesse

//Editar Competencia
router.post('/editar/competencia/:id', CompetenciaController.EditarCompetencia)
//Eliminar Competencia
router.delete('/eliminar/competencia/:id', CompetenciaController.EliminarCompetencia)




//Rotas de Team Lead


//Rotas Gerais

//Funcionarios
router.get('/lista/funcionarios',  FuncionarioController.ListaFuncionarios);
router.get('/lista/funcionarios/developers', FuncionarioController.ListaDevelopers);
router.get('/lista/funcionarios/developers/developers', FuncionarioController.ListaAllDevelopers);

router.get('/lista/competenciasfuncionario/:id', CompetenciaController.CompetenciasFuncionario);
router.get('/lista/habilitacoesfuncionario/:id', FuncionarioController.HabilitacoesFuncionario);
router.get('/lista/interessesfuncionario/:id', InteresseController.InteressesFuncionarios);
router.get('/lista/teamlead',  FuncionarioController.ListaTeamLead)
router.post('/upload/fotografias', multer(multerConfig).single('file'), (req, res) => {
    console.log(req.file)
    return res.json({ hello: "Feito" })
})

//Cargo

//Competencias
router.get('/competencia/:id', CompetenciaController.MostrarCompetencia)
router.get('/lista/competencias', CompetenciaController.ListaCompetencias);
router.get('/lista/competencias/funcionario/funcionario', CompetenciaController.ListaCompetenciasFuncionario)
router.get('/lista/funcionarios/competencias/:id', CompetenciaController.CompetenciasFuncionario);
//Categorias
router.get('/adicionar/categoria', CategoriaController.AdicionarCategoria)

//Interesses
router.get('/interesse/:id', InteresseController.MostrarInteresse)
router.get('/lista/interesses', InteresseController.ListaInteresses);
router.post('/editar/interesse/:id', InteresseController.EditarInteresse)

router.get('/lista/funcionarios/interesses/:id', InteresseController.get);

//Projetos
router.get('/projeto/:id', ProjetoControllers.MostrarProjeto)
router.get('/lista/projetosfuncionario/:id', ProjetoControllers.ProjetosFuncionarios)
router.get('/lista/projetos/projetos/:id', ProjetoControllers.ProjetosLimiteFuncionarios)
router.get('/lista/projetosfuncionarioteamlead/:id', ProjetoControllers.TeamLeadProjeto)
router.get('/lista/projetos', ProjetoControllers.ListaProjetos)
router.get('/lista/projetonome/:id', ProjetoControllers.NomeProjeto)


//Habilitacoes


//Testes
router.get('/teste/:id', ProjetoControllers.EquipaProjeto)

//Autenticação Testes
*/




module.exports = router