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
            const receitaPorId = await Receita.solicitarDataBasePorId({ where: { id: Number(id) } })
            if (Object.keys(receitaPorId).length === 0) {
                throw new Error('Não existe receitas com id informado!')
            } else {
                return res.status(200).json(receitaPorId)
            }

        } catch (error) {
            if (error.message === 'Não existe receitas com id informado!') {
                return res.status(400).json({ mensagem: `Não existe receitas para o id ${id} solicitado.` })
            }
            return res.status(500).json({ message: `Erro: ${error}` })
        }
    }
    /* Criar Receitas */
    static async criarReceita(req, res) {
        const receitaNova = req.body
        try {
            if (Object.keys(receitaNova).length === 0) {
                throw new Error(`Campo de receita vazio!`)
            } else if (!receitaNova.descricao || !receitaNova.valor || !receitaNova.data || !receitaNova.usuario_Id) {
                throw new Error(`Preencha os campos obrigatório!`)
            }
            const novaReceita = await Receita.criarDataBase(receitaNova)
            return res.status(201).json(novaReceita)
        } catch (error) {
            if (error.message === 'Campo de receita vazio!') {
                return res.status(400).json({ message: `Erro: ${error.message}` })
            } else if (error.message === `Preencha os campos obrigatório!`) {
                return res.status(400).json({ message: `Erro: ${error.message}` })
            } else {
                return res.status(500).json({ message: `Erro: ${error}` })
            }
        }
    }
    /* Atualizar Receitas por Id */
    static async atualizarReceitaPorId(req, res) {
        const { id } = req.params;
        const atualizarReceita = req.body;
        try {

            if (Object.keys(atualizarReceita).length === 0) {
                throw new Error(`Campo de receita vazio!`)
            } else if (!atualizarReceita.descricao || !atualizarReceita.valor || !atualizarReceita.data || !atualizarReceita.usuario_Id) {
                throw new Error(`Preencha os campos obrigatório!`)
            } else {
                const receitaAtualizada = await Receita.modificarDataBasePorId(atualizarReceita, { where: { id: Number(id) } })
                return res.status(201).json(receitaAtualizada)
            }

        } catch (error) {
            if (error.message === `Campo de receita vazio!`) {
                return await res.status(400).json({ mensagem: `${error.message}` })
            } else if (error.message === `Preencha os campos obrigatório!`) {
                return await res.status(400).json({ mensagem: `${error.message}` })
            } else {
                return await res.status(500).json({ mensagem: `${error}` })
            }
        }
    }
    /* Deletar Receitas por Id */
    static async deletarReceitaPorId(req, res) {
        const { id } = req.params;
        try {
            if (await Receita.excluirDataBasePorId({ where: { id: Number(id) } })) {
                return res.status(201).json({ message: `Receita de id: ${id}, deletada com sucesso!` })
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

module.exports = ReceitasControllers;