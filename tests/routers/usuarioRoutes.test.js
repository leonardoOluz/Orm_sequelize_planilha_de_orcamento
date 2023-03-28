const { beforeEach, afterEach, describe, it } = require('@jest/globals');
const request = require('supertest');
const express = require('express');
const router = require('../../db/api/routes');
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

describe('POST - Usuários', () => {
    const login = {
        email: "rodoserv@email.com",
        senha: "testando"
    }
    it('Deve buscar todos usuários', async () => {
        const respostas = await request(app)
            .post('/usuario/login')
            .send({email: login.email, senha: login.senha})
            .expect(200)
        console.log(respostas.body.infoToken)

    })
})