const express = require('express');
const routes = require('./routes')
/* Métodos do express e porta do servidor */
const app = express();
const port = process.env.PORT || 3000;

/* Passando rotas para app gerenciar */
routes(app)

/* Servidor */
app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
})
