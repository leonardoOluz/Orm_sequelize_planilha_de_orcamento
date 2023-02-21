const database = require('../models')

class Services {
    constructor (nomeModel) {
        this.nomeModel = nomeModel
    }

    async pegarTodosUsuarios (where = {}){
        return await database[this.nomeModel].findAll(where)
    }

    async pegarUsuarioPorId (where = {}){
        return await database[this.nomeModel].findAll(where)
    }

    
}

module.exports = Services;
