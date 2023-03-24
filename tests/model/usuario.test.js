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
    it('Dever acessar usuario por ID', async () => {
        const resposta = await databaseUsuario.solicitarDataBasePorId({ where: { id: usuarioId } });
        expect(resposta[0].dataValues.nome).toEqual(usuario.nome);
    })
    it('Deve solicitar usuario por email', async () => {
        const resposta = await databaseUsuario.solicitarDataBase({ where: { email: usuario.email } });
        expect(resposta[0].dataValues.email).toEqual(usuario.email);
    })
    it('Deve atualizar usuario checando sal e hash',async () => {
        const updateUsuario = {
            nome: 'Usuario Jest',
            senha: 'teste102030'
        }
        const resposta = await databaseUsuario.atualizarUsuarioChekarHashSal(updateUsuario, usuarioId);
        expect(resposta[0].dataValues.nome).toEqual(updateUsuario.nome);
    })
    it('Deve excluir autor no BD por ID', async () => {
        const resultado = await databaseUsuario.excluirDataBasePorId({ where: { id: usuarioId } });
        expect(resultado).toBe(true)
    });
})