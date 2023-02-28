const database = require('../models')
const { DespesasServices } = require('../services')
/* Instanciando nova despesas */
const Despesas = new DespesasServices();

class DespesasControllers {
    /* Acessando Despesas  */
    static async acessarDespesasDatabase(req, res) {
        try {
            const despesasExistente = await Despesas.solicitarDataBase()
            return res.status(200).json(despesasExistente)
        } catch (error) {
            return res.status(500).json({ messagem: `Erro ${error}` })
        }
    }
    /* Acessar Despesas por Id */
    static async acessarDespesaPorId(req, res) {
        const { id } = req.params
        try {
            const despesaPorId = await Despesas.solicitarDataBasePorId({ where: { id: Number(id) } })
            if (Object.keys(despesaPorId).length === 0) {
                throw new Error('Não existe receitas com id informado!')
            } else {
                return res.status(200).json(despesaPorId)
            }
        } catch (error) {
            if (error.message === 'Não existe receitas com id informado!') {
                return res.status(400).json({ mensagem: `Não existe receitas para o id ${id} solicitado.` })
            } else {
                return res.status(500).json({ message: `Erro: ${error}` })
            }
        }
    }
    static async criarDespesa(req, res) {
        const despesaNova = req.body
        try {
            const novaDespesa = await database.Despesas.create(despesaNova);
            return res.status(201).json(novaDespesa)
        } catch (error) {
            return res.status(500).json({ message: `Erro: ${error}` })
        }
    }
    static async atualizarDespesaPorId(req, res) {
        const { id } = req.params;
        const atualizarDespesa = req.body;
        try {
            await database.Despesas.update(atualizarDespesa, { where: { id: Number(id) } })
            const despesaAtualizada = await database.Despesas.findOne({ where: { id: Number(id) } })
            return res.status(201).json(despesaAtualizada)
        } catch (error) {
            return res.status(500).json({ message: `Erro: ${error}` })
        }
    }
    static async deletarDespesaPorId(req, res) {
        const { id } = req.params;
        try {
            await database.Despesas.destroy({ where: { id: Number(id) } })
            return res.status(201).json({ message: `Despesa de id: ${id}, deletada com sucesso!` })
        } catch (error) {
            return res.status(500).json({ message: `Erro: ${error}` })
        }
    }
}

module.exports = DespesasControllers;