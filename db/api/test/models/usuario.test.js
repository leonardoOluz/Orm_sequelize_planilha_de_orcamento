const {describe, it, expect, jest} = require('@jest/globals')
const {criarSenhaSalHash, descriptografarHashSal} = require('../../util/senhaSalHash.js')
describe('Testando modelo usuario',()=>{
    const [sal, senhaHash] = criarSenhaSalHash('testando').split(':')
    const Usuario = {
        nome: 'Leonardo',
        email: 'leoluz@email.com',
        senha: senhaHash,
        sal: sal,
        ativo: true
    }
    
})