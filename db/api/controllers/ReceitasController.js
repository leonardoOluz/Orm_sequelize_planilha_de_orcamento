const { ReceitasServices, DespesasServices, UsuariosServices } = require('../services')
/* Instanciando novo Objeto */
const Despesas = new DespesasServices();
const Receita = new ReceitasServices();
const Usuario = new UsuariosServices();

class ReceitasControllers {
    /* Acessar todas Receitas ou por descrição */
    static async acessarReceitasDatabase(req, res) {
        const { descricao } = req.query;
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        try {
            if (await Usuario.checkTokenUsuarioAcesso(token)) {
                if (descricao) {
                    const receitasDescricaoDataBase = await Receita.solicitarDataBase({ where: { descricao: descricao } })
                    return res.status(201).json(receitasDescricaoDataBase)
                } else {
                    const receitasExistente = await Receita.solicitarDataBase()
                    return res.status(200).json(receitasExistente)
                }
            }
        } catch (error) {
            return res.status(500).json({ messagem: `${error}` })
        }
    }
    /* Acessar as Receitas por Id */
    static async acessarReceitaPorId(req, res) {
        const { id } = req.params
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        try {
            if (await Usuario.checkTokenUsuarioAcesso(token)) {
                const receitaPorId = await Receita.solicitarDataBasePorId({ where: { id: Number(id) } });
                return res.status(200).json(receitaPorId);
            }
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    }
    /* Acessando Receitas por data */
    static async buscarReceitasPorData(req, res) {
        const { ano, mes } = req.params

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        try {
            if (await Usuario.checkTokenUsuarioAcesso(token)) {
                const receitasDatas = await Receita.verificarDatasReceitas({ ano, mes });
                if (receitasDatas) {
                    res.status(201).json(receitasDatas);
                } else {
                    throw new Error(`Não há receitas com a data informada!`);
                }
            }
        } catch (error) {
            return res.status(400).json({ mensagem: `${error}` })
        }
    }
    /* Criar Receitas */
    static async criarReceita(req, res) {
        const receitaNova = req.body
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        try {
            if (await Usuario.checkTokenUsuarioAcesso(token)) {
                const novaReceita = await Receita.criarReceitaNova(receitaNova);
                return res.status(201).json(novaReceita);
            }
        } catch (error) {
            return res.status(500).json({ message: `${error}` });

        }
    }
    /* Atualizar Receitas por Id */
    static async atualizarReceitaPorId(req, res) {
        const { id } = req.params;
        const receitaParaAtualizar = req.body;
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        try {
            if (await Usuario.checkTokenUsuarioAcesso(token)) {
                const receitaAtualizada = await Receita.atualizarReceitasporId(receitaParaAtualizar, id);
                return res.status(201).json(receitaAtualizada);
            }
        } catch (error) {
            return await res.status(500).json({ mensagem: `${error}` });
        }
    }
    /* Deletar Receitas por Id */
    static async deletarReceitaPorId(req, res) {
        const { id } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        try {
            if (await Usuario.checkTokenUsuarioAcesso(token)) {
                await Receita.excluirDataBasePorId({ where: { id: Number(id) } });
                return res.status(201).json({ message: `Receita de id: ${id}, deletada com sucesso!` });
            }
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }
    }
    /* Resumo de receitas e despesas por data */
    static async resumoDespesasReceitasPorData(req, res) {
        const { ano, mes } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        try {
            if (await Usuario.checkTokenUsuarioAcesso(token)) {
                const receitasData = await Receita.verificarDatasReceitas({ ano, mes });
                const despesasData = await Despesas.verificarDatasDespesas({ ano, mes });
                const resultado = await Receita.resumoReceitasDespesas(receitasData, despesasData, { mes, ano });
                if (resultado.valorReceitas === 0 && resultado.valorDespesas === 0) {
                    throw new Error(`Não há dados para resumo!`);
                } else {
                    res.status(200).json(resultado);
                }
            }
        } catch (error) {
            res.status(500).json({ message: `${error}` })
        }

    }
}

module.exports = ReceitasControllers;