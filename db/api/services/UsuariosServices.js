const Services = require('./Services')

class UsuarioServices extends Services {
    constructor() {
        super('Usuario')
    }
    async trataErro(error) {
       
    }

}

module.exports = UsuarioServices