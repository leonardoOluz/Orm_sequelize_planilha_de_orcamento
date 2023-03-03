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
    /* Criar Despesas */
    static async criarDespesa(req, res) {
        const despesaNova = req.body
        try {
            if (Object.keys(despesaNova).length === 0) {
                throw new Error(`Campo de despesas vazio!`)
            } else if (!despesaNova.descricao || !despesaNova.valor || !despesaNova.data || !despesaNova.usuario_Id) {
                throw new Error(`Preencha os campos obrigatório!`)
            } else {
                const novaDespesa = await Despesas.criarDataBase(despesaNova)
                return res.status(201).json(novaDespesa)
            }
        } catch (error) {
            if (error.message === 'Campo de despesas vazio!!') {
                return res.status(400).json({ message: `Erro: ${error.message}` })
            } else if (error.message === `Preencha os campos obrigatório!`) {
                return res.status(400).json({ message: `Erro: ${error.message}` })
            } else {
                return res.status(500).json({ message: `Erro: ${error}` })
            }
        }
    }
    /* Atualizar Despesas por Id */
    static async atualizarDespesaPorId(req, res) {
        const { id } = req.params;
        const atualizarDespesa = req.body;
        try {
            if (Object.keys(atualizarDespesa).length === 0) {
                throw new Error(`Campo de despesas vazio!`)
            } else if (!atualizarDespesa.descricao || !atualizarDespesa.valor || !atualizarDespesa.data || !atualizarDespesa.usuario_Id) {
                throw new Error(`Preencha os campos obrigatório!`)
            } else {
                const novaDespesa = await Despesas.modificarDataBasePorId(atualizarDespesa, { where: { id: Number(id) } })
                if (Object.keys(novaDespesa).length === 0) {
                    throw new Error('Não existe a despesa informada!')
                } else {
                    return res.status(201).json(novaDespesa)
                }
            }
        } catch (error) {
            if (error.message === 'Campo de despesas vazio!!') {
                return res.status(400).json({ message: `Erro: ${error.message}` })
            } else if (error.message === `Preencha os campos obrigatório!`) {
                return res.status(400).json({ message: `Erro: ${error.message}` })
            } else if (error.message === 'Não existe a despesa informada!') {
                return res.status(400).json({ message: `Erro: ${error.message}` })
            } else {
                return res.status(500).json({ message: `Erro: ${error}` })
            }
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