const { criarSenhaSalHash, descriptografarHashSal } = require('../../db/api/util/senhaSalHash')
const { describe, expect } = require('@jest/globals')

const senha = 'testando'
describe('Criando Sal e Hash', () => {
    let sal, senhaHash;
    it('Deve gerar Sal e Hash', async () => {
        [sal, senhaHash] = criarSenhaSalHash(senha).split(':')
        expect(sal).toEqual(expect.any(String))
        expect(senhaHash).toEqual(expect.any(String))
    })
    it('Deve descriptografar ', async () => {
        const senhaDescriptografada = await descriptografarHashSal(senha, senhaHash, sal)
        expect(senhaDescriptografada).toBe(true)
    })
})