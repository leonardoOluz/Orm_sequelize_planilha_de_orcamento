const database = require('../models')

class ReceitasControllers {
    static async acessarReceitasDatabase(req, res) {
        try {
            const receitasExistente = await database.Receitas.findAll()
            return res.status(200).json(receitasExistente)
        } catch (error) {
            return res.status(500).json({ messagem: `Erro ${error}` })
        }
    }
    static async acessarReceitaPorId(req, res) {
        const { id } = req.params
        try {
            const receitaPorId = await database.Receitas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(receitaPorId)
        } catch (error) {
            return res.status(500).json({ message: `Erro: ${error}` })
        }
    }
    static async criarReceita(req, res) {
        const receitaNova = req.body
        try {
            const novaReceita = await database.Receitas.create(receitaNova);
            return res.status(201).json(novaReceita)
        } catch (error) {
            return res.status(500).json({ message: `Erro: ${error}` })
        }
    }
    static async atualizarReceitaPorId(req, res) {
        const { id } = req.params;
        const atualizarReceita = req.body;
        try {
            await database.Receitas.update(atualizarReceita, { where: { id: Number(id) } })
            const receitaAtualizada = await database.Receitas.findOne({ where: { id: Number(id) } })
            return res.status(201).json(receitaAtualizada)
        } catch (error) {
            return res.status(500).json({ message: `Erro: ${error}` })
        }
    }
    static async deletarReceitaPorId(req, res) {
        const {id} = req.params;
        try {
            await database.Receitas.destroy({where: {id: Number(id)}})
            return res.status(201).json({message: `Receita de id: ${id}, deletada com sucesso!`})
        } catch (error) {
            return res.status(500).json({message: `Erro: ${error}`})
        }
    }
}

module.exports = ReceitasControllers;