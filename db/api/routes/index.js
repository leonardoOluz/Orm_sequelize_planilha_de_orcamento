const bodyParser = require('body-parser');
const usuarios = require('./usuariosRouters')
/*  Exportar as rotas  */
module.exports = app => {
    app.use(
        bodyParser.json(),
        usuarios
    )
}
