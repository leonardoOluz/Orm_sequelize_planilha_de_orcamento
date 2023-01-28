const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.get('/teste', (req, res) => {
    res.status(200).json({ msg: `Testando porta ${port}` })
})

app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
})
