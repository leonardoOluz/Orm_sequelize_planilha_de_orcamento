const Services = require('./Services.js')

class DespesasServices extends Services {
    constructor() {
        super('Despesas')
    }

    async checkDespesasDuplicada(DespesasDescricao, DespesasData) {
        const dbDespesassDescricao = await super.solicitarDataBase({ where: { descricao: DespesasDescricao } })
        let resp = [];        
            dbDespesassDescricao.forEach((obj) => {
                let outrasDatas = Number(obj.dataValues.data.slice(5, 7));
                let dataAtualizada = Number(DespesasData.slice(5, 7));
                if (outrasDatas === dataAtualizada) {
                    resp.push(outrasDatas);
                }
            })       
        
        if (Object.keys(resp).length === 0) {
            return true;
        } else {
            return false;
        }
    }
    async checkDespesasDuplicadaPorId(descricao, data, id) {
        const dbDespesassDescricao = await super.solicitarDataBase({ where: { descricao: descricao } })
        const dbDespesasId = await super.solicitarDataBasePorId({ where: { id: Number(id) } })
        let resp = [];
            
            dbDespesassDescricao.forEach((obj) => {
                if (Number(obj.dataValues.id) !== Number(id)) {
                    if (dbDespesasId[0].dataValues.descricao === obj.dataValues.descricao) {
                        let outrasDatas = Number(obj.dataValues.data.slice(5, 7));
                        let dataAtualizada = Number(data.slice(5, 7));
                        if (outrasDatas === dataAtualizada) {
                            resp.push(outrasDatas);
                        }
                    }
                }
            });
        
        if (Object.keys(resp).length === 0) {
            return true;
        } else {
            return false;
        }
    }
    async verificarCategoriaESalvarNovaDespesas(despesas) {
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
    async verificarCategoriaEAtualizarDespesas(despesas, id) {
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
        if (await this.checkDespesasDuplicadaPorId(despesas.descricao, despesas.data, id)) {
            if (verifique) {
                return await super.modificarDataBasePorId(despesas,{where: {id: Number(id)}})
            } else {
                throw new Error(`Categoria inválida! Verifique as categorias aceitas:${categorias}`)
            }
        } else {
            throw new Error(`Existe uma data com a descrição: ${despesas.descricao} repetida! Data: ${despesas.data}. Verifique outra data!`)
        }
    }
}

module.exports = DespesasServices
