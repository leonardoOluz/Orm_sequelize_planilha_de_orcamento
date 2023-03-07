const DespesasControllers = require('../controllers/despesasController')
const {Router} = require('express');
const router = Router();

router
   .get('/despesas', DespesasControllers.acessarDespesasDatabase)
   .get('/receitas/{:ano}{:mes}', DespesasControllers.acessarDespesasDatabase)
   .get('/despesas/id/:id', DespesasControllers.acessarDespesaPorId)
   .get('/despesas/descricao/:descricao', DespesasControllers.buscarDespesasPorDescricao)
   .post('/despesas', DespesasControllers.criarDespesa)
   .put('/despesas/:id', DespesasControllers.atualizarDespesaPorId)
   .delete('/despesas/:id', DespesasControllers.deletarDespesaPorId)

module.exports = router;