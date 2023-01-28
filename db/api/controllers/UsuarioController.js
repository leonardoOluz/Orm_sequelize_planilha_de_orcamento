const dataBase = require('../models')

class UsuarioController {
    /* Acessar todos os usuários */
    static async acessarUsuario(req, res) {
        try {
            const usuarios = await dataBase.Usuario.findAll()
            return res.status(200).json(usuarios)
        } catch (error) {
            res.status(500).json({ msg: `erro ${error}` })
        }
    }
}

module.exports = UsuarioController