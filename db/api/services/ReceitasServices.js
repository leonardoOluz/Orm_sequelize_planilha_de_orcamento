const Services = require('./Services.js')

class ReceitasServices extends Services {
    constructor() {
        super('Receitas')
    }

    /* Verificar receitas duplicadas pelas descrições */
    async checkReceitasDuplicada(receitasDescricao, receitasData) {
        const dbreceitassDescricao = await super.solicitarDataBase({ where: { descricao: receitasDescricao } })
        let resp = [];
        dbreceitassDescricao.map(obj => {
            if (obj.dataValues.data.slice(0, 7) === receitasData.slice(0, 7)) {
                resp.push(obj.dataValues.data);
            }
        })
        if (Object.keys(resp).length === 0) {
            return true;
        } else {
            return false;
        }
    }
    /* Verificar receitas duplicadas pelas descrições e checar Id */
    async checkReceitasDuplicadaPorId(descricao, data, id) {
        const dbreceitassDescricao = await super.solicitarDataBase({ where: { descricao: descricao } })
        const dbreceitasId = await super.solicitarDataBasePorId({ where: { id: Number(id) } })
        let resp = [];

        dbreceitassDescricao.map(obj => {
            if (Number(obj.dataValues.id) !== Number(id)) {
                if (dbreceitasId[0].dataValues.descricao === obj.dataValues.descricao) {
                    if (obj.dataValues.data.slice(0, 7) === data.slice(0, 7)) {
                        resp.push(obj.dataValues.data);
                    }
                }
            }
        })

        if (Object.keys(resp).length === 0) {
            return true;
        } else {
            return false;
        }
    }
    /* Atualizar receita por id checando dados */
    async atualizarReceitasporId(dados, id) {
        const { descricao, data } = dados;
        if (await this.checkReceitasDuplicadaPorId(descricao, data, id)) {
            return await super.modificarDataBasePorId(dados, { where: { id: Number(id) } })
        } else {
            throw new Error(`Existe uma data repetida no mesmo mês!`)
        }

    }
    /* Criando receitas porém verificando se há dados repetidos */
    async criarReceitaNova(dados) {
        const { descricao, data } = dados;
        if (await this.checkReceitasDuplicada(descricao, data)) {
            return await super.criarDataBase(dados);
        } else {
            throw new Error(`Existe uma data repetida no mesmo mês!`);
        }
    }
    /* Listar receitas por Datas  */
    async verificarDatasReceitas({ ano, mes }) {
        const receitas = await super.solicitarDataBase();
        if ((ano !== undefined) && (mes !== undefined)) {
            return this.listarReceitasPorAnoMes(receitas, { ano, mes });
        } else if (ano) {
            return this.listarReceitasPorAno(receitas, ano);
        } else if (mes) {
            return this.listarReceitasPorMes(receitas, mes);
        }
    }
    /* Listar despesas por mês */
    async listarReceitasPorMes(receitas, mes) {
        let checkDataMes = [];
        receitas.map(obj => {
            if (obj.dataValues.data.slice(5, 7) === mes) {
                checkDataMes.push(obj.dataValues);
            }
        })
        if (Object.values(checkDataMes).length === 0) {
            throw new Error(`Não há receitas com a data informada!`);
        } else {
            return checkDataMes;
        }
    }
    /* Listar receitas por ano */
    async listarReceitasPorAno(receitas, ano) {
        let checkDataAno = [];
        receitas.map(obj => {
            if (obj.dataValues.data.slice(0, 4) === ano) {
                checkDataAno.push(obj.dataValues);
            }
        })
        if (Object.values(checkDataAno).length === 0) {
            throw new Error(`Não há receitas com a data informada!`);
        } else {
            return checkDataAno;
        }
    }
    /* listar receitas por ano e mês */
    async listarReceitasPorAnoMes(receitas, { ano, mes }) {
        let checkDataMesAno = [];
        receitas.map(obj => {
            if ((obj.dataValues.data.slice(0, 4) === ano) && (obj.dataValues.data.slice(5, 7) === mes)) {
                checkDataMesAno.push(obj.dataValues);
            }
        })
        if (Object.values(checkDataMesAno).length === 0) {
            throw new Error(`Não há receitas com a data informada!`);
        } else {
            return checkDataMesAno;
        }
    }
    /* Resumo de despesas por mês */
    async resumoReceitasDespesas(receitasData, despesasData) {
        let categorias = ['Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outras'];
        let totReceitas = 0, totDespesas = 0;
        let letCat;
        let letSoma = 0;
        let filtrarCategoria = [];

        receitasData.map(obj => {
            totReceitas += Number(obj.valor)
        });
        despesasData.map(obj => {
            totDespesas += Number(obj.valor)
        });
        const resumo = {
            data: receitasData[0].data.slice(0, 7),
            valorReceitas: Math.round(totReceitas, -1),
            valorDespesas: Math.round(totDespesas, -1),
            saldoFinal: Math.round((totReceitas - totDespesas), -1),
            categorias: []
        };
        categorias.map(objDeCategorias => {
            filtrarCategoria = despesasData.filter(obj => obj.categoria.includes(objDeCategorias))
            if (Object.values(filtrarCategoria).length !== 0) {
                filtrarCategoria.map(obj => {
                    letCat = obj.categoria;
                    letSoma += obj.valor;
                })
                resumo.categorias.push({ categoria: letCat, valor: letSoma })
                letCat = '';
                letSoma = 0;
            }
        });
        return resumo
    }
}

module.exports = ReceitasServices