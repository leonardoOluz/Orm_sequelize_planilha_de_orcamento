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
const despesas_teste = {
    descricao: "Conta de água",
    valor: 650.5,
    data: "2023-06-28",
    usuario_Id: 1,
    categoria: ""
};
beforeEach(() => {
    const port = process.env.PORT || 8081;
    server = app.listen(port);
});
afterEach(() => {
    server.close();
});
describe('Testes de rotas em despesas', () => {
    it('Deve Logar Usuário para acesso ao sistema com token', async () => {
        const respostas = await request(app)
            .post('/usuario/login')
            .send(login)
            .expect(200);
        expect(respostas.body.infoToken).toEqual(expect.any(String));
        token = respostas.body.infoToken;
    });
    describe('GET - despesas', () => {
        it('Deve retornar todas as despesas', async () => {
            const resposta = await request(app)
                .get('/despesas')
                .auth(token, { type: 'bearer' })
                .expect(200);
            expect(resposta.body[resposta.body.length - 1]).toEqual(expect.objectContaining({
                id: expect.any(Number),
                descricao: expect.any(String),
                valor: expect.any(Number),
                data: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                usuario_Id: expect.any(Number),
                categoria: expect.any(String)
            }));
            userId = resposta.body[resposta.body.length - 1].id
        });
        it('Deve retornar despesas por descrição', async () => {
            const resposta = await request(app)
                .get(`/despesas?descricao=xpto`)
                .query({ descricao: despesas_teste.descricao })
                .auth(token, { type: 'bearer' })
                .expect(201);
            expect(resposta.body[0].descricao).toBe(despesas_teste.descricao);
        });
        it('Deve retornar despesas por data ano e mes', async () => {
            const resposta = await request(app)
                .get(`/despesas/ano/${despesas_teste.data.slice(0, 4)}/mes/${despesas_teste.data.slice(5, 7)}`)
                .auth(token, { type: 'bearer' })
                .expect(201);
            expect(resposta.body[0].data.slice(0, 7)).toBe(despesas_teste.data.slice(0, 7));
        });
        it('Deve retornar despesas por ID', async () => {
            const resposta = await request(app)
                .get(`/despesas/id/${userId}`)
                .auth(token, { type: 'bearer' })
                .expect(200);
            expect(resposta.body[0]).toEqual(expect.objectContaining({
                id: expect.any(Number),
                descricao: expect.any(String),
                valor: expect.any(Number),
                data: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                usuario_Id: expect.any(Number),
                categoria: expect.any(String)
            }));
        });
    });
    describe('POST - despesas', () => {
        it('Deve criar nova Despesa', async () => {
            despesas_teste.data = '2023-08-05';
            const resposta = await request(app)
                .post('/despesas')
                .auth(token, { type: 'bearer' })
                .send(despesas_teste);
            expect(resposta.body.data).toBe(despesas_teste.data);
            userId = resposta.body.id;
        });
    });
    describe('PUT - despesas', () => {
        it('Deve atualizar despesa por Id', async () => {
            despesas_teste.valor = 135.50;
            const resposta = await request(app)
                .put(`/despesas/${userId}`)
                .auth(token, { type: 'bearer' })
                .send(despesas_teste)
                .expect(201);
            expect(resposta.body[0].valor).toBe(despesas_teste.valor);
        });
    });
    describe('DELETE - despesas', () => {
        it('Deve deletar despesa por ID', async () => {
            const resposta = await request(app)
                .delete(`/despesas/${userId}`)
                .auth(token, { type: 'bearer' })
                .expect(201);
            expect(resposta.body).toEqual(expect.any(Object));
        });
    });
});