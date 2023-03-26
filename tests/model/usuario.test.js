const { describe, it, expect } = require('@jest/globals')
const { UsuariosServices } = require('../../db/api/services');
const { criarToken } = require('../../db/api/util/gerarJwt');
const { criarSenhaSalHash } = require('../../db/api/util/senhaSalHash');
const databaseUsuario = new UsuariosServices();


describe('Criar novo usuario', () => {
    const usuario = {
        nome: 'usuario',
        email: 'usuario@email.com',
        senha: 'testando',
        ativo: true
    }
    let usuarioId;
    it('Deve criar novo usuário', async () => {
        const novoUsuario = await databaseUsuario.salvarNovoUsuarioComSalHash(usuario);
        expect(novoUsuario).toEqual(expect.objectContaining({
            id: expect.any(Number),
            nome: usuario.nome,
            email: usuario.email
        }));
        usuarioId = novoUsuario.id
    })
    it('Deve acessar usuario por ID', async () => {
        const resposta = await databaseUsuario.solicitarDataBasePorId({ where: { id: usuarioId } });
        expect(resposta[0].dataValues.nome).toEqual(usuario.nome);
    })
    it('Deve acessar usuario por email', async () => {
        const resposta = await databaseUsuario.solicitarDataBase({ where: { email: usuario.email } });
        expect(resposta[0].dataValues.email).toEqual(usuario.email);
    })
    it('Deve acessar usuário por login email e senha', async () => {
        const infoToken = await databaseUsuario.acessarUsuarioPorSalHash(usuario.email, 'testando');
        expect(infoToken).toEqual(expect.any(String));
    })
    it('Deve atualizar usuario checando sal e hash', async () => {
        const updateUsuario = {
            nome: 'Usuario Jest',
            senha: 'teste102030'
        }
        const resposta = await databaseUsuario.atualizarUsuarioChekarHashSal(updateUsuario, usuarioId);
        expect(resposta[0].dataValues.nome).toEqual(updateUsuario.nome);
    })   
    it('Deve verificar token usuário', async () => {
        const usuarioToken = {
            nome: 'Usuario Jest',
            email: 'usuario@email.com'
        }
        const dadosToken = criarToken(usuarioToken)
        const resposta = await databaseUsuario.checkTokenUsuarioAcesso(dadosToken)
        expect(resposta).toBeTruthy()
    })
    it('Deve excluir autor no BD por ID', async () => {
        const resultado = await databaseUsuario.excluirDataBasePorId({ where: { id: usuarioId } });
        expect(resultado).toBe(true)
    });
    it('Deve criar novo usuario por services', async () => {
        const [sal, senhaHash] = criarSenhaSalHash(usuario.senha).split(':');
        usuario.sal = sal;
        usuario.senha = senhaHash;
        const resposta = await databaseUsuario.criarDataBase(usuario);
        expect(resposta.dataValues).toEqual(expect.objectContaining({
            ativo: expect.any(Boolean),
            id: expect.any(Number),
            ...usuario,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        }));
        usuarioId = resposta.dataValues.id;
    })
    it('Deve excluir usuario criado por services', async () => {
        const resultado = await databaseUsuario.excluirDataBasePorId({ where: { id: usuarioId } });
        expect(resultado).toBe(true);
    })
})