const dataBase = require('../models') 

class UsuarioController {
    /* Acessar todos os usuários */
    static async acessarUsuario(req, res) {
        try {
            const usuarios = await dataBase.Usuario.findAll()
            return res.status(200).json(usuarios)
        } catch (error) {
            return res.status(500).json({ msg: `erro ${error}` })
        }
    }
    /* Acessar um usuario */
    static async acessarUsuarioPorid(req, res) {
        const { id } = req.params
        try {
            const usuarioId = await dataBase.Usuario.findOne({ where: { id: Number(id) } })
            return res.status(201).json(usuarioId)
        } catch (error) {
            return res.status(500).json({ msg: `Erro ${error}` })
        }
    }
    /* Criar usuário novo */
    static async criarUsuario(req, res) {
        const usuarioNovo = req.body
        try {
            const novoUsuario = await dataBase.Usuario.create(usuarioNovo)
            return res.status(201).json(novoUsuario)
        } catch (error) {
            return res.status(500).json({ msg: `erro ${error}` })
        }
    }
    /* Atualizar usuario */
    static async atualizarInfoPoId(req, res) {
        const { id } = req.params
        const atualizaUsuario = req.body
        try {
            await dataBase.Usuario.update(atualizaUsuario, { where: { id: Number(id) } })
            const usuarioAtualizado = await dataBase.Usuario.findOne({ where: { id: Number(id) } })
            res.status(200).json(usuarioAtualizado)
        } catch (error) {
            res.status(500).json({ msg: `erro ${error}` })
        }
    }
    /* Deletar usuário */
    static async deletarUsuario(req, res) {
        const { id } = req.params;
        try {
            await dataBase.Usuario.destroy({ where: { id: Number(id) } })
            return res.status(201).json({ msg: `Usuario de id: ${id} deletado` })
        } catch (error) {
            return res.status(500).json({ msg: `Erro ${error}` })
        }
    }
}

module.exports = UsuarioController