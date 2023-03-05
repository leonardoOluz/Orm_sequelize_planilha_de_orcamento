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
            const despesaPorId = await Despesas.solicitarDataBasePorId({ where: { id: Number(id) } });
            return res.status(200).json(despesaPorId);
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
    /* Criar Despesas */
    static async criarDespesa(req, res) {
        const despesaNova = req.body
        try {
            const novaDespesa = await Despesas.verificarCategoriaESalvarNovaDespesas(despesaNova);
            return res.status(201).json(novaDespesa);
        } catch (error) {
            return res.status(400).json({ message: `${error}` });
        }
    }
    /* Atualizar Despesas por Id */
    static async atualizarDespesaPorId(req, res) {
        const { id } = req.params;
        const atualizarDespesa = req.body;
        try {
            const novaDespesa = await Despesas.verificarCategoriaEAtualizarDespesas(atualizarDespesa,id);
            return res.status(201).json(novaDespesa);

        } catch (error) {
            return res.status(400).json({ message: `${error}` });
        }
    }
    /* Deletar Despesas por Id */
    static async deletarDespesaPorId(req, res) {
        const { id } = req.params;
        try {
            if (await Despesas.excluirDataBasePorId({ where: { id: Number(id) } })) {
                return res.status(201).json({ message: `Despesa de id: ${id}, deletada com sucesso!` })
            } else {
                throw new Error(`Id inexistente!`)
            }
        } catch (error) {
            if (error.message === 'Id inexistente!') {
                return res.status(400).json({ message: `${error}` })
            } else {
                return res.status(500).json({ message: `${error}` })
            }
        }
    }
}

module.exports = DespesasControllers;