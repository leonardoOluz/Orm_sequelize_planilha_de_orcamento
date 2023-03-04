const database = require('../models')

class Services {
    constructor(nomeModel) {
        this.nomeModel = nomeModel
    }
    async solicitarDataBase(where = {}) {
        return await database[this.nomeModel].findAll(where)
    }
    async solicitarDataBasePorId(where = {}) {
        const resposta = await database[this.nomeModel].findAll(where);
        if (Object.keys(resposta).length === 0) {
            throw new Error(`ID: ${this.nomeModel} inexistente`);
        } else {
            return resposta;
        }
    }
    async criarDataBase(where = {}) {
        if (Object.values(where).length === 0) {
            throw new Error(`Não há dados para salvar`)
        } else {
            return await database[this.nomeModel].create(where)
        }
    }
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
