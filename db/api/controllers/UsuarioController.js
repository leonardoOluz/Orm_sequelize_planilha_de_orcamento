const { UsuariosServices } = require('../services')
/* Instanciando novo objeto */
const usuario = new UsuariosServices()

class UsuarioController {
    /* Acessar todos os usuários */
    static async acessarUsuario(req, res) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        try {
            if (await usuario.checkTokenUsuarioAcesso(token)) {
                const retornarUsuarios = await usuario.solicitarDataBase()
                return res.status(200).json(retornarUsuarios)
            }
        } catch (error) {
            return res.status(500).json({ msg: `${error}` })
        }
    }
    /* Acessar um usuario por id*/
    static async acessarUsuarioPorid(req, res) {
        const { id } = req.params
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        try {
            if (await usuario.checkTokenUsuarioAcesso(token)) {
                const usuarioId = await usuario.solicitarDataBasePorId({ where: { id: Number(id) } })
                return res.status(201).json(usuarioId);
            }
        } catch (error) {
            return res.status(400).json({ mensagem: `${error.message}` })
        }
    }
    /* Acessar usuário por login email e senha*/
    static async acessarUsuarioPorLogin(req, res) {
        const { email, senha } = req.body;
        try {
            const infoToken = await usuario.acessarUsuarioPorSalHash(email, senha)
            return res.status(200).json({ msg: `Autenticação realizada com sucesso`, infoToken })
        } catch (error) {
            return res.status(500).json({ msg: `${error}` })
        }

    }
    /* Criar usuário novo */
    static async criarUsuario(req, res) {
        const usuarioNovo = req.body;
        try {
            const newUser = await usuario.salvarNovoUsuarioComSalHash(usuarioNovo);
            return res.status(201).json(newUser);
        } catch (error) {
            return await res.status(500).json({ mensagem: `${error}` });
        }
    }
    /* Atualizar usuario */
    static async atualizarInfoPoId(req, res) {
        const { id } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const atualizaUsuario = req.body;
        try {
            if (await usuario.checkTokenUsuarioAcesso(token)) {
                const usuarioAtualizado = await usuario.atualizarUsuarioChekarHashSal(atualizaUsuario, id);
                res.status(200).json(usuarioAtualizado);
            }
        } catch (error) {
            return await res.status(500).json({ mensagem: `${error}` });
        }
    }
    /* Deletar usuário */
    static async deletarUsuario(req, res) {
        const { id } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        try {
            if (await usuario.checkTokenUsuarioAcesso(token)) {
                await usuario.excluirDataBasePorId({ where: { id: Number(id) } })
                return res.status(201).json({ mensagem: `Id: ${id} excluído com sucesso!` })
            }
        } catch (error) {
            return res.status(400).json({ msg: `Erro ${error}` });
        }
    }
}

module.exports = UsuarioController