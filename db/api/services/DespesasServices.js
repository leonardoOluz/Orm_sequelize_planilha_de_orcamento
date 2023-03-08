const Services = require('./Services.js')

class DespesasServices extends Services {
    constructor() {
        super('Despesas')
    }

    /* Verificar despesas duplicadas por descrição e data */
    async checkDespesasDuplicada(DespesasDescricao, DespesasData) {
        const dbDespesassDescricao = await super.solicitarDataBase({ where: { descricao: DespesasDescricao } })
        let resp = [];
        dbDespesassDescricao.forEach((obj) => {
            if (obj.dataValues.data.slice(0, 7) === DespesasData.slice(0, 7)) {
                resp.push(obj.dataValues.data);
            }
        })

        if (Object.keys(resp).length === 0) {
            return true;
        } else {
            return false;
        }
    }
    /* Verificar despesas duplicadas por id data e descrição */
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
    /* Verificar categoria de despesas para criar nova despesa */
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
    /* Verificar categoria de despesas antes de atualizar */
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
                return await super.modificarDataBasePorId(despesas, { where: { id: Number(id) } })
            } else {
                throw new Error(`Categoria inválida! Verifique as categorias aceitas:${categorias}`)
            }
        } else {
            throw new Error(`Existe uma data com a descrição: ${despesas.descricao} repetida! Data: ${despesas.data}. Verifique outra data!`)
        }
    }
    /* Listar despesas por Datas  */
    async verificarDatasDespesas({ ano, mes }) {
        const despesas = await super.solicitarDataBase();
        if ((ano !== undefined) && (mes !== undefined)) {
            return this.listarDespesasPorAnoMes(despesas, { ano, mes });
        } else if (ano) {
            return this.listarDespesasPorAno(despesas, ano);
        } else if (mes) {
            return this.listarDespesasPorMes(despesas, mes);
        }
    }
    /* Listar despesas por mês */
    async listarDespesasPorMes(despesas, mes) {

        let checkDataMes = []
        despesas.map(obj => {
            if (obj.dataValues.data.slice(5, 7) === mes) {
                checkDataMes.push(obj.dataValues);
            }
        })
        if (Object.values(checkDataMes).length === 0) {
           return false;
        } else {
            return checkDataMes;
        }
    }
    /* Listar despesas por ano */
    async listarDespesasPorAno(despesas, ano) {
        let checkDataAno = [];
        despesas.map(obj => {
            if (obj.dataValues.data.slice(0, 4) === ano) {
                checkDataAno.push(obj.dataValues);
            }
        })
        if (Object.values(checkDataAno).length === 0) {
           return false ;
        } else {
            return checkDataAno;
        }
    }
    /* listar despesas por ano e mês */
    async listarDespesasPorAnoMes(despesas, { ano, mes }) {
        let checkDataMesAno = [];
        despesas.map(obj => {
            if ((obj.dataValues.data.slice(0, 4) === ano) && (obj.dataValues.data.slice(5, 7) === mes)) {
                checkDataMesAno.push(obj.dataValues);
            }
        })
        if (Object.values(checkDataMesAno).length === 0) {
           return false;
        } else {
            return checkDataMesAno;
        }
    }
}

module.exports = DespesasServices
