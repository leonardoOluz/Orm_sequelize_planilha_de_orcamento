const UsuarioController = require('../controllers/UsuarioController')
const {Router} = require('express');
const router = Router();

/* Caminho dos endPoints de Usuário */
router
  .get('/usuarios', UsuarioController.acessarUsuario)


module.exports = router;