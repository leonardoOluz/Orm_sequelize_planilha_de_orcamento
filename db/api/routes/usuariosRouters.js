const UsuarioController = require('../controllers/UsuarioController')
const {Router} = require('express');
const router = Router();

/* Caminho dos endPoints de Usuário */
router
  .get('/usuarios', UsuarioController.acessarUsuario)
  .get('/usuarios/id/:id', UsuarioController.acessarUsuarioPorid)
  .post('/usuario/login', UsuarioController.acessarUsuarioPorLogin)
  .post('/usuarios', UsuarioController.criarUsuario)
  .put('/usuarios/:id', UsuarioController.atualizarInfoPoId)
  .delete('/usuarios/:id', UsuarioController.deletarUsuario)


module.exports = router;