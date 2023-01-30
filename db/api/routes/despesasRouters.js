const DespesasControllers = require('../controllers/despesasController')
const {Router} = require('express');
const router = Router();

router
   .get('/despesas', DespesasControllers.acessarDespesasDatabase)
   .get('/despesas/:id', DespesasControllers.acessarDespesaPorId)
   .post('/despesas', DespesasControllers.criarDespesa)
   .put('/despesas/:id', DespesasControllers.atualizarDespesaPorId)
   .delete('/despesas/:id', DespesasControllers.deletarDespesaPorId)

module.exports = router;