const ReceitasControllers = require('../controllers/ReceitasController')
const {Router} = require('express');
const router = Router();

router
   .get('/receitas', ReceitasControllers.acessarReceitasDatabase)
   .get('/receitas?descricao=xpto', ReceitasControllers.acessarReceitasDatabase)   
   .get('/receitas/ano/:ano/mes/:mes', ReceitasControllers.buscarReceitasPorData)
   .get('/receitas/id/:id', ReceitasControllers.acessarReceitaPorId)
   
   .get('/resumo/{:ano}{:mes}', ReceitasControllers.resumoDespesasReceitasPorData)
   
   .post('/receitas', ReceitasControllers.criarReceita)
   .put('/receitas/:id', ReceitasControllers.atualizarReceitaPorId)
   .delete('/receitas/:id', ReceitasControllers.deletarReceitaPorId)

module.exports = router;