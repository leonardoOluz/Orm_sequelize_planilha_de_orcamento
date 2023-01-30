const database = require('../models')

class DespesasControllers {
    static async acessarDespesasDatabase(req, res) {
        try {
            const despesasExistente = await database.Despesas.findAll()
            return res.status(200).json(despesasExistente)
        } catch (error) {
            return res.status(500).json({ messagem: `Erro ${error}` })
        }
    }
    static async acessarDespesaPorId(req, res) {
        const { id } = req.params
        try {
            const despesaPorId = await database.Despesas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(despesaPorId)
        } catch (error) {
            return res.status(500).json({ message: `Erro: ${error}` })
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
        const {id} = req.params;
        try {
            await database.Despesa.destroy({where: {id: Number(id)}})
            return res.status(201).json({message: `Despesa de id: ${id}, deletada com sucesso!`})
        } catch (error) {
            return res.status(500).json({message: `Erro: ${error}`})
        }
    }
}

module.exports = DespesasControllers;