const Services = require('./Services.js')

class DespesasServices extends Services {
    constructor() {
        super('Despesas')
    }
    verificarCategoriaESalvar(despesas) {
        let categorias = ['Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outras', '']
        let verifique = false
        console.log(despesas.categoria)
        categorias.map(categoria => {
            if (categoria === despesas.categoria) {
                if (categoria === '') {
                    despesas.categoria = categorias[7];
                    verifique = true;
                }
                verifique = true;
            }
        })
        console.log(despesas.categoria)
        return verifique;
    }

}

module.exports = DespesasServices
