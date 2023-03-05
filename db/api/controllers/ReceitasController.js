const { ReceitasServices } = require('../services')
/* Instanciando novo Objeto */
const Receita = new ReceitasServices();

class ReceitasControllers {
    /* Acessar as Receitas */
    static async acessarReceitasDatabase(req, res) {
        try {
            const receitasExistente = await Receita.solicitarDataBase()
            return res.status(200).json(receitasExistente)
        } catch (error) {
            return res.status(500).json({ messagem: `Erro ${error}` })
        }
    }
    /* Acessar as Receitas por Id */
    static async acessarReceitaPorId(req, res) {
        const { id } = req.params
        try {
            const receitaPorId = await Receita.solicitarDataBasePorId({ where: { id: Number(id) } });
            return res.status(200).json(receitaPorId);

        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
    /* Acessando Receitas por descrições */
    static async buscarReceitasPorDescricao(req, res) {
        const descricao = req.params.descricao
        try {
            const receitasDescricaoDataBase = await Receita.solicitarDataBase({ where: { descricao: descricao } })
            return res.status(201).json(receitasDescricaoDataBase)
        } catch (error) {
            return res.status(400).json({ mensagem: `${error}` })
        }
    }
    /* Criar Receitas */
    static async criarReceita(req, res) {
        const receitaNova = req.body
        try {
            const novaReceita = await Receita.criarReceitaNova(receitaNova);
            return res.status(201).json(novaReceita);

        } catch (error) {
            return res.status(500).json({ message: `${error}` });

        }
    }
    /* Atualizar Receitas por Id */
    static async atualizarReceitaPorId(req, res) {
        const { id } = req.params;
        const receitaParaAtualizar = req.body;
        try {
            const receitaAtualizada = await Receita.atualizarReceitasporId(receitaParaAtualizar, id);
            return res.status(201).json(receitaAtualizada);

        } catch (error) {
            return await res.status(500).json({ mensagem: `${error}` });
        }
    }
    /* Deletar Receitas por Id */
    static async deletarReceitaPorId(req, res) {
        const { id } = req.params;
        try {
            await Receita.excluirDataBasePorId({ where: { id: Number(id) } });
            return res.status(201).json({ message: `Receita de id: ${id}, deletada com sucesso!` });

        } catch (error) {
            return res.status(500).json({ message: `${error}` })

        }
    }
}

module.exports = ReceitasControllers;