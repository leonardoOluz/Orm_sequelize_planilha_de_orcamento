const DespesasControllers = require('../controllers/despesasController')
const {Router} = require('express');
const router = Router();

router
   .get('/despesas', DespesasControllers.acessarDespesasDatabase)
   .get('/despesas?descricao=xpto', DespesasControllers.acessarDespesasDatabase)
   .get('/despesas/ano/:ano/mes/:mes', DespesasControllers.buscarDespesasPorData) 
   .get('/despesas/id/:id', DespesasControllers.acessarDespesaPorId)
   .post('/despesas', DespesasControllers.criarDespesa)
   .put('/despesas/:id', DespesasControllers.atualizarDespesaPorId)
   .delete('/despesas/:id', DespesasControllers.deletarDespesaPorId)

module.exports = router;