const { describe, it, expect } = require('@jest/globals')
const { UsuariosServices } = require('../../db/api/services')
const databaseUsuario = new UsuariosServices();


describe('Criar novo usuario', () => {
    const usuario = {
        nome: 'usuario',
        email: 'usuario@email.com',
        senha: 'testando',
        ativo: true
    }
    let usuarioId;
    it('Dever criar novo usuário', async () => {
        const novoUsuario = await databaseUsuario.salvarNovoUsuarioComSalHash(usuario);
        expect(novoUsuario).toEqual(expect.objectContaining({
            id: expect.any(Number),
            nome: usuario.nome,
            email: usuario.email
        }));
        usuarioId = novoUsuario.id
    })
    it('Deve excluir autor no BD', async () => {
        const resultado = await databaseUsuario.excluirDataBasePorId({ where: { id: usuarioId } });
        expect(resultado).toBe(true)
    });
})