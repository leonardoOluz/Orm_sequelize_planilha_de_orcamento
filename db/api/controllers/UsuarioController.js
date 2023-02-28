const { UsuariosServices } = require('../services')
/* Instanciando novo objeto */
const usuario = new UsuariosServices()

class UsuarioController {
    /* Acessar todos os usuários */
    static async acessarUsuario(req, res) {
        try {
            const usuarios = await usuario.solicitarDataBase()
            return res.status(200).json(usuarios)
        } catch (error) {
            return res.status(500).json({ msg: `erro ${error}` })
        }
    }
    /* Acessar um usuario */
    static async acessarUsuarioPorid(req, res) {
        const { id } = req.params
        try {
            const usuarioId = await usuario.solicitarDataBasePorId({ where: { id: Number(id) } })
            if (Object.keys(usuarioId).length === 0) {
                throw new Error('Usuário inexistente')
            }
            return res.status(201).json(usuarioId)
        } catch (error) {
            if (error.message === 'Usuário inexistente') {
                return res.status(400).json({ mensagem: `${error.message}` })
            }
            return res.status(500).json({ msg: `Erro ${error.message}` })
        }
    }
    /* Criar usuário novo */
    static async criarUsuario(req, res) {
        const usuarioNovo = req.body
        try {
            if (Object.keys(usuarioNovo).length === 0) {
                throw new Error(`Campo de usuário vazio!`)
            } else if (!usuarioNovo.nome || !usuarioNovo.email || !usuarioNovo.senha) {
                throw new Error(`Campos obrigatorios vazio, preencha os campos`)
            }
            const novoUsuario = await usuario.criarDataBase(usuarioNovo)
            return res.status(201).json(novoUsuario)
        } catch (error) {
            if (error.message === `Campo de usuário vazio!`) {
                return await res.status(400).json({ mensagem: `${error.message}` })
            } else if (error.message === `Campos obrigatorios vazio, preencha os campos`) {
                return await res.status(400).json({ mensagem: `${error.message}` })
            } else {
                return await res.status(500).json({ mensagem: `${error}` })
            }
        }
    }
    /* Atualizar usuario */
    static async atualizarInfoPoId(req, res) {
        const { id } = req.params
        const atualizaUsuario = req.body
        try {
            if (Object.keys(atualizaUsuario).length === 0) {
                throw new Error(`Campo de usuário vazio!`)
            } else if (!atualizaUsuario.nome || !atualizaUsuario.email || !atualizaUsuario.senha) {
                throw new Error(`Campos obrigatorios vazio, preencha os campos`)
            } else {
                const usuarioAtualizado = await usuario.modificarDataBasePorId(atualizaUsuario, { where: { id: Number(id) } })
                res.status(200).json(usuarioAtualizado)
            }
        } catch (error) {
            if (error.message === `Campo de usuário vazio!`) {
                return await res.status(400).json({ mensagem: `${error.message}` })
            } else if (error.message === `Campos obrigatorios vazio, preencha os campos`) {
                return await res.status(400).json({ mensagem: `${error.message}` })
            } else {
                return await res.status(500).json({ mensagem: `${error}` })
            }
        }
    }
    /* Deletar usuário */
    static async deletarUsuario(req, res) {
        const { id } = req.params;
        try {
            if (await usuario.excluirDataBasePorId({ where: { id: Number(id) } })) {
                return res.status(201).json({ msg: `Usuario de id: ${id} deletado` });
            } else {
                throw new Error(`Id de inexistente`)
            }

        } catch (error) {
            if (error.message === `Id de inexistente`) {
                return res.status(400).json({ mensagem: `Id ${id} inexistente` });
            }
            return res.status(500).json({ msg: `Erro ${error}` });
        }
    }
}

module.exports = UsuarioController