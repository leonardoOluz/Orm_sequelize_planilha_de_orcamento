const Services = require('./Services');
const { criarSenhaSalHash, descriptografarHashSal } = require('../util/senhaSalHash.js');
const { criarToken, verificarToken } = require('../util/gerarJwt.js');

class UsuarioServices extends Services {
    constructor() {
        super('Usuario')
    }

    async salvarNovoUsuarioComSalHash(dados) {
        const [sal, senhaHash] = criarSenhaSalHash(dados.senha).split(':')
        dados.senha = senhaHash;
        dados.sal = sal
        const { user, created } = await super.criarDataBaseChecandoDados({
            where: { email: dados.email },
            defaults: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                ativo: dados.ativo,
                sal: dados.sal
            }
        })
        if (created) {
            return { nome: user.nome, email: user.email }
        } else {
            throw new Error(`Email existente!`);
        }
    }
    async acessarUsuarioPorSalHash(email, senha) {
        const usuarioChecar = await super.solicitarDataBase({ where: { email: email } })
        if (usuarioChecar[0].ativo) {
            if (await descriptografarHashSal(senha, usuarioChecar[0].senha, usuarioChecar[0].sal)) {
                return criarToken({ id: usuarioChecar[0].id, nome: usuarioChecar[0].nome, email: usuarioChecar[0].email })
            } else {
                throw new Error(`Senha errada !`)
            }
        } else {
            throw new Error(`Usuário não autorizado!`);
        }
    }
    async checkTokenUsuarioAcesso(dadosToken) {
        const verificadoUsuario = verificarToken(dadosToken);
        const usuarioExistente = await super.solicitarDataBase({ where: { email: verificadoUsuario.email } });
        if (usuarioExistente[0].dataValues.ativo) {
            return true;
        } else {
            throw new Error(`Usuário não autorizado!`);
        }
    }
    async atualizarUsuarioChekarHashSal(dadosAtualizar, id) {
        const usuarioPorId = await super.solicitarDataBasePorId({ where: { id: id } });
        if (usuarioPorId[0].dataValues.sal === null) {
            if (dadosAtualizar.senha) {
                const [sal, senhaHash] = criarSenhaSalHash(dadosAtualizar.senha).split(':');
                dadosAtualizar.senha = senhaHash;
                dadosAtualizar.sal = sal;
                return await super.modificarDataBasePorId(dadosAtualizar, { where: { id: id } });
            } else {
                throw new Error(`Por favor será necessário colocar uma nova senha !`);
            }
        } else {
            if (dadosAtualizar.senha) {
                const [sal, senhaHash] = criarSenhaSalHash(dadosAtualizar.senha).split(':');
                dadosAtualizar.senha = senhaHash;
                dadosAtualizar.sal = sal;
                return await super.modificarDataBasePorId(dadosAtualizar, { where: { id: id } });
            } else {
                dadosAtualizar.senha = usuarioPorId[0].dataValues.senha
                return await super.modificarDataBasePorId(dadosAtualizar, { where: { id: id } });
            }
        }

    }
}

module.exports = UsuarioServices