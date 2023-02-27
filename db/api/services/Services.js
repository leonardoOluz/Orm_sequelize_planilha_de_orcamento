const database = require('../models')

class Services {
    constructor(nomeModel) {
        this.nomeModel = nomeModel
    }

    async solicitarDataBase(where = {}) {
        return await database[this.nomeModel].findAll(where)
    }

    async solicitarDataBasePorId(where = {}) {
        return await database[this.nomeModel].findAll(where)
    }

    async criarDataBase(where = {}) {
        return await database[this.nomeModel].create(where)
    }

    async modificarDataBasePorId(updateDados, where = {}) {
        return await database[this.nomeModel].update(updateDados, where )
    }

    async excluirDataBasePorId(where){
        return await database[this.nomeModel].destroy(where)
    }

}

module.exports = Services;
