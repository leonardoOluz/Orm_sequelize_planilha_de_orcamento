const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.SECRET;

function criarToken(dados) {
    const dadosToken = jwt.sign(dados, secret, { expiresIn: '1h' })
    return dadosToken;
}
function verificarToken(dados){
    
}


module.exports = criarToken;
