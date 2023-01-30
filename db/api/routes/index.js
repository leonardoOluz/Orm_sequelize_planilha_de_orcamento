const bodyParser = require('body-parser');
const usuarios = require('./usuariosRouters')
const receitas = require('./receitasRouters')
const despesas = require('./despesasRouters')
/*  Exportar as rotas  */
module.exports = app => {
    app.use(
        bodyParser.json(),
        usuarios,
        receitas,
        despesas
    )
}
