const { beforeEach, afterEach, describe, it, expect } = require('@jest/globals');
const request = require('supertest');
const express = require('express');
const router = require('../../db/api/routes');
require('dotenv').config();
const app = express();
const login = {
    email: process.env.EMAIl,
    senha: process.env.SENHA
};
let token;
let userId;
router(app);
let server;
beforeEach(() => {
    const port = process.env.PORT || 8083;
    server = app.listen(port)
});
afterEach(() => {
    server.close();
});
const usuario = {
    nome: 'usuarioRotas',
    email: 'usuariorotas@email.com',
    senha: 'testando',
    ativo: true
};
describe('Testes de rotas em usuário', () => {  
    describe('POST - Usuários', () => {
        it('Deve logar usuário cadastrado', async () => {
            const respostas = await request(app)
                .post('/usuario/login')
                .send(login)
                .expect(200);
            expect(respostas.body.infoToken).toEqual(expect.any(String));
            token = respostas.body.infoToken;
        });
        it('Deve criar novo usuário passando token', async () => {
            const respostas = await request(app)
                .post('/usuarios')
                .send(usuario);
            expect(respostas.body).toEqual(expect.objectContaining({
                id: expect.any(Number),
                nome: usuario.nome,
                email: usuario.email
            }));
            userId = respostas.body.id;
        });
    });
    describe('GET - Usuários', () => {
        it('Deve acessar usuarios', async () => {
            const resposta = await request(app)
                .get('/usuarios')
                .auth(token, { type: 'bearer' })
                .expect(200);
            expect(resposta.body[resposta.body.length - 1]).toEqual(expect.objectContaining({
                id: expect.any(Number),
                nome: expect.any(String),
                email: expect.any(String),
                senha: expect.any(String),
                sal: expect.any(String),
                ativo: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }));
        });
        it('Deve acessar usuário por ID', async () => {
            const resposta = await request(app)
                .get(`/usuarios/id/${userId}`)
                .auth(token, { type: 'bearer' });
            expect(resposta.body[0].id).toBe(userId)
        });
    });
    describe('PUT - Usuário', () => {
        const nomeUsuario = {
            nome: 'Usuario das Rotas'
        };
        it('Deve atualizar usuario',async () => {
            const resposta = await request(app)
            .put(`/usuarios/${userId}`)
            .auth(token, {type: 'bearer'})
            .send(nomeUsuario);
            expect(resposta.body[0].nome).toBe(nomeUsuario.nome);      
        });
    });
    describe('DELETE - Usuário', () => {
        it('Deve deletar usuario por Id', async () => {
            const resposta = await request(app)
                .delete(`/usuarios/${userId}`)
                .auth(token, { type: 'bearer' });
            expect(resposta.body).toEqual(expect.objectContaining({ mensagem: expect.any(String) }));
        });
    });
});

