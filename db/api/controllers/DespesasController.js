const { DespesasServices } = require('../services')
/* Instanciando nova despesas */
const Despesas = new DespesasServices();

class DespesasControllers {
    /* Acessando Despesas  */
    static async acessarDespesasDatabase(req, res) {
        const { descricao } = req.query;
        try {
            if (descricao) {
                const DespesasDescricaoDataBase = await Despesas.solicitarDataBase({ where: { descricao: descricao } })
                return res.status(201).json(DespesasDescricaoDataBase)
            } else {
                const despesasExistente = await Despesas.solicitarDataBase();
                return res.status(200).json(despesasExistente);
            }
        } catch (error) {
            return res.status(500).json({ messagem: `${error}` })
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
    /* Acessando Despesass por descrições */
    static async buscarDespesasPorData(req, res) {
        const { ano, mes } = req.params
        try {
            const despesasDatas = await Despesas.verificarDatasDespesas({ ano, mes });
            res.status(201).json(despesasDatas);
        } catch (error) {
            return res.status(400).json({ mensagem: `${error}` })
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
            const novaDespesa = await Despesas.verificarCategoriaEAtualizarDespesas(atualizarDespesa, id);
            return res.status(201).json(novaDespesa);

        } catch (error) {
            return res.status(400).json({ message: `${error}` });
        }
    }
    /* Deletar Despesas por Id */
    static async deletarDespesaPorId(req, res) {
        const { id } = req.params;
        try {
            await Despesas.excluirDataBasePorId({ where: { id: Number(id) } });
            return res.status(201).json({ message: `Despesa de id: ${id}, deletada com sucesso!` });

        } catch (error) {
            return res.status(400).json({ message: `${error}` });

        }
    }
}

module.exports = DespesasControllers;