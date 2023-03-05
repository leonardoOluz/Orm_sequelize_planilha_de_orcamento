const ReceitasControllers = require('../controllers/ReceitasController')
const {Router} = require('express');
const router = Router();

router
   .get('/receitas', ReceitasControllers.acessarReceitasDatabase)
   .get('/receitas/id/:id', ReceitasControllers.acessarReceitaPorId)
   .get('/receitas/descricao/:descricao', ReceitasControllers.buscarReceitasPorDescricao)
   .post('/receitas', ReceitasControllers.criarReceita)
   .put('/receitas/:id', ReceitasControllers.atualizarReceitaPorId)
   .delete('/receitas/:id', ReceitasControllers.deletarReceitaPorId)

module.exports = router;