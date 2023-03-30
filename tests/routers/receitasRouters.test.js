const { beforeEach, afterEach, describe, it, expect } = require('@jest/globals');
const request = require('supertest');
const express = require('express');
const router = require('../../db/api/routes');
const app = express();
require('dotenv').config();
let server;
let token, userId;
router(app);
const login = {
    email: process.env.EMAIl,
    senha: process.env.SENHA
};
const usuarioTest = {
    descricao: "Vale Trasporte",
    valor: 350.50,
    data: "2023-07-05",
    usuario_Id: 1
};
beforeEach(() => {
    const port = 8080;
    server = app.listen(port);
});
afterEach(() => {
    server.close();
});
describe('Testes de rotas em receitas', () => {
    it('Deve Logar Usuário para acesso ao sistema com token', async () => {
        const respostas = await request(app)
            .post('/usuario/login')
            .send(login)
            .expect(200);
        expect(respostas.body.infoToken).toEqual(expect.any(String));
        token = respostas.body.infoToken;
    });
    describe('GET - Receitas', () => {
        it('Deve retornar todas as receitas', async () => {
            const resposta = await request(app)
                .get('/receitas')
                .auth(token, { type: 'bearer' })
                .expect(200);
            expect(resposta.body[resposta.body.length - 1]).toEqual(expect.objectContaining({
                id: expect.any(Number),
                descricao: expect.any(String),
                valor: expect.any(Number),
                data: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                usuario_Id: expect.any(Number)
            }));
            userId = resposta.body[resposta.body.length - 1].id
        });
        it('Deve retornar receitas por descrição', async () => {
            const resposta = await request(app)
                .get(`/receitas?descricao=xpto`)
                .query({ descricao: usuarioTest.descricao })
                .auth(token, { type: 'bearer' })
                .expect(201);
            expect(resposta.body[0].descricao).toBe(usuarioTest.descricao);
        });
        it('Deve retornar receitas por data ano e mes', async () => {
            const resposta = await request(app)
                .get(`/receitas/ano/${usuarioTest.data.slice(0, 4)}/mes/${usuarioTest.data.slice(5, 7)}`)
                .auth(token, { type: 'bearer' })
                .expect(201);
            expect(resposta.body[0].data.slice(0, 7)).toBe(usuarioTest.data.slice(0, 7));
        });
        it('Deve retornar receita por ID', async () => {
            const resposta = await request(app)
                .get(`/receitas/id/${userId}`)
                .auth(token, { type: 'bearer' })
                .expect(200);
            expect(resposta.body[0]).toEqual(expect.objectContaining({
                id: expect.any(Number),
                descricao: expect.any(String),
                valor: expect.any(Number),
                data: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                usuario_Id: expect.any(Number)
            }));
        });
        it('Deve retornar o resumo da receitas do mes e ano', async () => {
            const resposta = await request(app)
                .get(`/resumo/ano/${'2023'}/mes/${'01'}`)
                .auth(token, { type: 'bearer' })
            expect(resposta.body).toEqual(expect.objectContaining({
                data: expect.any(String),
                valorReceitas: expect.any(Number),
                valorDespesas: expect.any(Number),
                saldoFinal: expect.any(Number),
                categorias: expect.any(Array)
            }));
        });
    });
    describe('POST - Receitas', () => {
        it('Deve criar nova Receita', async () => {
            usuarioTest.data = '2023-08-05';
            const resposta = await request(app)
                .post('/receitas')
                .auth(token, { type: 'bearer' })
                .send(usuarioTest);
            expect(resposta.body.data).toBe(usuarioTest.data);
            userId = resposta.body.id;
        });
    });
    describe('PUT - Receitas', () => {
        it('Deve atualizar receita por Id', async () => {
            usuarioTest.valor = 1350;
            const resposta = await request(app)
                .put(`/receitas/${userId}`)
                .auth(token, { type: 'bearer' })
                .send(usuarioTest)
                .expect(201);
            expect(resposta.body[0].valor).toBe(usuarioTest.valor);
        });
    });
    describe('DELETE - Receitas', () => {
        it('Deve deletar receita por ID', async () => {
            const resposta = await request(app)
                .delete(`/receitas/${userId}`)
                .auth(token, { type: 'bearer' })
                .expect(201);
            expect(resposta.body).toEqual(expect.any(Object));
        });
    });
});