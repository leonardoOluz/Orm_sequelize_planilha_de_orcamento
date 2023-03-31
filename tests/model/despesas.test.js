const { describe, it, expect } = require('@jest/globals');
const { DespesasServices } = require('../../db/api/services');
const despesasDatabase = new DespesasServices();
const despesas_teste = {
    descricao: "Conta de água",
    valor: 650.5,
    data: "2023-06-28",
    usuario_Id: 1,
    categoria: ""
};
let data = "2023-09-01";
let usuarioId;
let ano = '2023';
let mes = '02';
describe('Testes unitários de despesas', () => {
    describe('Testes de despesas duplicadas, função checkdespesasDuplicada', () => {
        it('Deve checar despesas duplicadas por descrição e data e retornar true', async () => {
            data = "2023-07-05"
            const resposta = await despesasDatabase.checkDespesasDuplicada(despesas_teste.descricao, data);
            expect(resposta).toBeTruthy();
        });
        it('Deve checar despesas duplicadas por descrição e data e retornar false', async () => {
            const resposta = await despesasDatabase.checkDespesasDuplicada(despesas_teste.descricao, despesas_teste.data);
            expect(resposta).toBeFalsy();
        });
    });
    describe('Testes de criar despesas', () => {
        const newdespesas = {
            descricao: "Conta de água",
            valor: 130.50,
            data: "2022-07-28",
            usuario_Id: 1,
            categoria: ""
        };
        it('Deve criar despesas com sucesso', async () => {
            const resposta = await despesasDatabase.verificarCategoriaESalvarNovaDespesas(newdespesas)
            expect(resposta.dataValues.valor).toBe(newdespesas.valor)
            usuarioId = resposta.dataValues.id;
        });
        it('Deve receber um erro de criar receita', async () => {
            await expect(despesasDatabase.verificarCategoriaESalvarNovaDespesas(newdespesas))
                .rejects
                .toThrow();
        });
    });
    describe('Teste de despesas duplicadas por id, função checkdespesasDuplicadaPorId', () => {
        it('Deve testar despesas duplicadas por id e retornar true', async () => {
            const resposta = await despesasDatabase.checkDespesasDuplicadaPorId(
                despesas_teste.descricao,
                despesas_teste.data,
                usuarioId
            );
            expect(resposta).toBeFalsy();
        });
        it('Deve testar despesas duplicadas por id e retornar false', async () => {
            const resposta = await despesasDatabase.checkDespesasDuplicadaPorId(
                despesas_teste.descricao,
                data,
                usuarioId
            );
            expect(resposta).toBeTruthy();
        });
    });
    describe('Testes de atualização de despesas', () => {
        it('Deve atualizar receita com sucesso', async () => {
            despesas_teste.valor = 134.50;
            const resposta = await despesasDatabase.modificarDataBasePorId(despesas_teste, { where: { id: usuarioId } });
            expect(resposta[0].dataValues.valor).toBe(despesas_teste.valor);
        });
        it('Deve receber mensagem de data existente para atualizar receita', async () => {
            despesas_teste.data = "2023-05-01";
            await expect(despesasDatabase.verificarCategoriaEAtualizarDespesas(despesas_teste, usuarioId))
                .rejects
                .toThrow();
        });
    });
    describe('Testes de listagem de despesas', () => {
        it('Deve retornar lista de despesas por mes e ano', async () => {
            const despesasTot = await despesasDatabase.checarDataBase();
            const resposta = await despesasDatabase.listarDespesasPorAnoMes(despesasTot, { ano, mes });
            expect(resposta).toHaveLength(1);
        });
        it('Deve retornar lista de despesas por mes', async () => {
            const despesasTot = await despesasDatabase.checarDataBase();
            const resposta = await despesasDatabase.listarDespesasPorMes(despesasTot, mes);
            expect(resposta).toHaveLength(1);
        });
        it('Deve retornar lista de despesas por ano', async () => {
            const despesasTot = await despesasDatabase.checarDataBase();
            const resposta = await despesasDatabase.listarDespesasPorAno(despesasTot, ano);
            expect(resposta).toHaveLength(9);
        });
    });
    describe('Teste de deletar despesas', () => {
        it('Deve deletar receita por id', async () => {
            const resultado = await despesasDatabase.excluirDataBasePorId({ where: { id: usuarioId } });
            expect(resultado).toBe(true);
        });
    });
});
