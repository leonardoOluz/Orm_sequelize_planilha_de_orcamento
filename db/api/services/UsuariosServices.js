const Services = require('./Services')
const { criarSenhaSalHash, descriptografarHashSal } = require('../util/senhaSalHash.js')

class UsuarioServices extends Services {
    constructor() {
        super('Usuario')
    }

    async salvarNovoUsuarioComSalHash(dados) {
        const { senha } = dados
        const [sal, senhaHash] = criarSenhaSalHash(senha).split(':')
        dados.senha = senhaHash;
        dados.sal = sal
        const usuarioNovo = await super.criarDataBase(dados)
        return {nome: usuarioNovo.nome, email: usuarioNovo.email}
    }
    async acessarUsuarioPorSalHash(email, senha){

        const usuarioChecar = await super.solicitarDataBase({where: { email: email}})
        console.log(await descriptografarHashSal(senha, usuarioChecar[0].senha, usuarioChecar[0].sal))
        if (await descriptografarHashSal(senha, usuarioChecar[0].senha, usuarioChecar[0].sal)) {
            return {nome: usuarioChecar[0].nome, email: usuarioChecar[0].email }
        } else {
            throw new Error(`Senha errada !`)
        }
        


    }

}

module.exports = UsuarioServices