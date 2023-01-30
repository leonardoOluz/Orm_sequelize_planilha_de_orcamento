const bodyParser = require('body-parser');
const usuarios = require('./usuariosRouters')
const receitas = require('./receitasRouters')
/*  Exportar as rotas  */
module.exports = app => {
    app.use(
        bodyParser.json(),
        usuarios,
        receitas
    )
}
