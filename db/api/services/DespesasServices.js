const Services = require('./Services.js')

class DespesasServices extends Services {
    constructor() {
        super('Despesas')
    }

    async checkDespesasDuplicada(DespesasDescricao, DespesasData, id = '') {
        const dbDespesassDescricao = await super.solicitarDataBase({ where: { descricao: DespesasDescricao } })
        let resp = [];

        if (id !== '') {
            const dbDespesasId = await super.solicitarDataBasePorId({ where: { id: Number(id) } })
            dbDespesassDescricao.forEach((obj) => {
                if (Number(obj.dataValues.id) !== Number(id)) {
                    if (dbDespesasId[0].dataValues.descricao === obj.dataValues.descricao) {
                        let outrasDatas = Number(obj.dataValues.data.slice(5, 7));
                        let dataAtualizada = Number(DespesasData.slice(5, 7));
                        if (outrasDatas === dataAtualizada) {
                            resp.push(outrasDatas);
                        }
                    }
                }
            });
        } else {
            dbDespesassDescricao.forEach((obj) => {
                let outrasDatas = Number(obj.dataValues.data.slice(5, 7));
                let dataAtualizada = Number(DespesasData.slice(5, 7));
                if (outrasDatas === dataAtualizada) {
                    resp.push(outrasDatas);
                }
            })
        }
        
        if (Object.keys(resp).length === 0) {
            return true;
        } else {
            return false;
        }
    }
    async verificarCategoriaESalvar(despesas) {
        let categorias = ['Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outras', '']
        let verifique = false

        categorias.map(categoria => {
            if (categoria === despesas.categoria) {
                if (categoria === '') {
                    despesas.categoria = categorias[7];
                    verifique = true;
                }
                verifique = true;
            }
        })
        if (await this.checkDespesasDuplicada(despesas.descricao, despesas.data)) {
            if (verifique) {
                return await super.criarDataBase(despesas)
            } else {
                throw new Error(`Categoria inválida! Verifique as categorias aceitas:${categorias}`)
            }
        } else {
            throw new Error(`Existe uma data com a descrição: ${despesas.descricao} repetida! Data: ${despesas.data}. Verifique outra data!`)
        }
    }
}

module.exports = DespesasServices
