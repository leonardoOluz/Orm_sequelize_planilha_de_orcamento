const { criarToken, verificarToken } = require('../../db/api/util/gerarJwt')
const { describe, it, expect } = require('@jest/globals')

const usuario = {
    nome: 'Loucura',
    email: 'loucura@email.com'
}
describe('Criando e verificando token', () => {
    let token;
    it('Dever criar um token', () => {
        token = criarToken(usuario)
        expect(token).toEqual(expect.any(String))
    })
    it('Deve verificarToken', () => {
        const resultado = verificarToken(token)
        expect(resultado).toEqual(expect.objectContaining({
            ...usuario,
            iat: expect.any(Number),
            exp: expect.any(Number)
        }))
    })
})