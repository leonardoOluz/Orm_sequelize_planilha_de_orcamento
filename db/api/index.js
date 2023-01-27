const express = require('express');
const bodyPaser = require('body-parser');

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyPaser.json())
app.get('/teste', (req, res)=>{
    res.status(200).send({msg: `ok`})
})

app.listen(port, ()=> {
    console.log(`servidor escutando na porta http://localhost:${port}`)
})