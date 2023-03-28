const { beforeEach, afterEach, describe, it, expect } = require('@jest/globals');
const request = require('supertest');
const express = require('express');
const router = require('../../db/api/routes');
require('dotenv').config();
const app = express();

router(app);

let server;

beforeEach(() => {
    const port = 6060;
    server = app.listen(port)
});

afterEach(() => {
    server.close();
})
describe('Testes de rotas em usuário', () => {
    const login = {
        email: process.env.EMAIl,
        senha: process.env.SENHA
    };
    let token;
    let userId;
    describe('POST - Usuários', () => {
        const usuario = {
            nome: 'usuarioRotas',
            email: 'usuariorotas@email.com',
            senha: 'testando',
            ativo: true
        }
        it('Deve logar usuário cadastrado', async () => {
            const respostas = await request(app)
                .post('/usuario/login')
                .send(login)
                .expect(200)
            expect(respostas.body.infoToken).toEqual(expect.any(String));
            token = respostas.body.infoToken;
        })
        it('Deve criar novo usuário passando token', async () => {
            const respostas = await request(app)
                .post('/usuarios')
                .send(usuario)
            expect(respostas.body).toEqual(expect.objectContaining({
                id: expect.any(Number),
                nome: usuario.nome,
                email: usuario.email
            }));
            userId = respostas.body.id;
        })
    })
    describe('DELETE - em usuário por Id', () => {
        it('Deve deletar usuario por Id', async () => {
            const resposta = await request(app)
                .delete(`/usuarios/${userId}`)
                .auth(token, { type: 'bearer' })
            expect(resposta.body).toEqual(expect.objectContaining({ mensagem: expect.any(String) }));
        })

    })

})

