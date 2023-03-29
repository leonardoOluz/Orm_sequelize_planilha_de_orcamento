const { describe, it, expect } = require('@jest/globals');
const { ReceitasServices } = require('../../db/api/services');
const { criarToken } = require('../../db/api/util/gerarJwt.js');
const receitasDatabase = new ReceitasServices();
require('dotenv').config();
const usuario = {
    nome: process.env.NOME,
    email: process.env.EMAIL
};
const receitas_teste = {
    id: 22,
    descricao: "Vale Trasporte",
    valor: 350.1,
    data: "2023-06-05",
    createdAt: "2023-03-15T19:59:52.000Z",
    updatedAt: "2023-03-15T19:59:52.000Z",
    usuario_Id: 2
};
let data;
let usuarioId;
const token = criarToken(usuario)
describe('Testes unitários de Receitas', () => {
    describe('Testes de receitas duplicadas, função checkReceitasDuplicada', () => {
        it('Deve checar receitas duplicadas por descrição e data e retornar true', async () => {
            data = "2023-08-05"
            const resposta = await receitasDatabase.checkReceitasDuplicada(receitas_teste.descricao, data);
            expect(resposta).toBeTruthy();
        });
        it('Deve checar receitas duplicadas por descrição e data e retornar false', async () => {
            const resposta = await receitasDatabase.checkReceitasDuplicada(receitas_teste.descricao, receitas_teste.data);
            expect(resposta).toBeFalsy();
        });
    });
    describe('Teste de receitas duplicadas por id, função checkReceitasDuplicadaPorId', () => {
        it('Deve testar receitas duplicadas por id e retornar true', async () => {
            const resposta = await receitasDatabase.checkReceitasDuplicadaPorId(
                receitas_teste.descricao,
                receitas_teste.data,
                receitas_teste.id
            );
            expect(resposta).toBeTruthy();
        });
        it('Deve testar receitas duplicadas por id e retornar false', async () => {
            data = "2023-05-05"
            const resposta = await receitasDatabase.checkReceitasDuplicadaPorId(
                receitas_teste.descricao,
                data,
                receitas_teste.id
            );
            expect(resposta).toBeFalsy();
        });
    });
    describe('Testes de atualização de receitas', () => {
        const updateReceitas = {
            descricao: "Vale Trasporte",
            valor: 190.50,
            data: "2023-03-01",
            usuario_Id: 1
        };
        it('Deve atualizar receita com sucesso', async () => {
            const resposta = await receitasDatabase.atualizarReceitasporId(updateReceitas, 2);
            expect(resposta[0].dataValues.valor).toBe(updateReceitas.valor);
        });
        it('Deve receber mensagem de data existente para atualizar receita', async () => {
            updateReceitas.data = "2023-02-01";
            await expect(receitasDatabase.atualizarReceitasporId(updateReceitas, 2))
                .rejects
                .toThrowError(new Error(`Existe uma data repetida no mesmo mês!`));
        });
    });
    describe('Teste de criar receitas', () => {
        const newReceitas = {
            descricao: "Aluguel",
            valor: 750,
            data: "2023-03-29",
            usuario_Id: 2
        };
        it('Deve criar receitas com sucesso', async () => {
            const resposta = await receitasDatabase.criarReceitaNova(newReceitas)
            expect(resposta.dataValues.valor).toBe(newReceitas.valor)
            usuarioId = resposta.dataValues.id;
        });
        it('Deve receber um erro de criar receita', async () => {
            await expect(receitasDatabase.criarReceitaNova(newReceitas))
                .rejects
                .toThrowError(new Error(`Existe uma data repetida no mesmo mês!`));
        });
    });
    describe('Teste de deletar receitas', () => {
        it('Deve deletar receita por id', async () => {
            const resultado = await receitasDatabase.excluirDataBasePorId({ where: { id: usuarioId } });
            expect(resultado).toBe(true);
        });
    });   
});
