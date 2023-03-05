const database = require('../models')

class Services {
    constructor(nomeModel) {
        this.nomeModel = nomeModel
    }
    /* Solicita database por paramentros ou sem paramentros */
    async solicitarDataBase(where = {}) {
        const resposta = await database[this.nomeModel].findAll(where)
        if (Object.keys(resposta).length === 0) {
            throw new Error(`${this.nomeModel} inexistente`);
        } else {
            return resposta;
        }
    }
    /* Solicitar database por Id */
    async solicitarDataBasePorId(where = {}) {
        const resposta = await database[this.nomeModel].findAll(where);
        if (Object.keys(resposta).length === 0) {
            throw new Error(`ID: ${this.nomeModel} inexistente`);
        } else {
            return resposta;
        }
    }
    /* Criar novo dado em database */
    async criarDataBase(where = {}) {
        if (Object.values(where).length === 0) {
            throw new Error(`Não há dados para salvar`)
        } else {
            return await database[this.nomeModel].create(where)
        }
    }
    /* Modificar dados por id  */
    async modificarDataBasePorId(updateDados, where = {}) {
        if (Object.values(updateDados).length === 0) {
            throw new Error(`Não há dados para serem atualizados!`)
        } else {
            const resposta = await database[this.nomeModel].update(updateDados, where)

            if (resposta.includes(0)) {
                throw new Error(`Id inexistente`)
            } else {
                return await this.solicitarDataBasePorId(where)
            }
        }
    }
    /* Excluir dados de database por Id */
    async excluirDataBasePorId(where) {
        const resposta = await database[this.nomeModel].destroy(where)
        if (!resposta) {
            throw new Error(`Id inexistente`)
        } else {
            return true
        }

    }
}

module.exports = Services;
