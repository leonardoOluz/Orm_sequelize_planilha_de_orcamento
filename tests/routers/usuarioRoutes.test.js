const { beforeEach, afterEach, describe, it } = require('@jest/globals');
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
    describe('POST - Usuários', () => {
        it('Deve buscar todos usuários', async () => {
            const respostas = await request(app)
                .post('/usuario/login')
                .send(login)
                .expect(200)
            console.log(respostas.body.infoToken)
        })
        it.skip('', () => {

        })
    })

})

