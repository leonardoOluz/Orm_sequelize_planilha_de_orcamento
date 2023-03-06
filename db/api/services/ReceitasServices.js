const Services = require('./Services.js')

class ReceitasServices extends Services {
    constructor() {
        super('Receitas')
    }

    /* Verificar receitas duplicadas pelas descrições */
    async checkReceitasDuplicada(receitasDescricao, receitasData) {
        const dbreceitassDescricao = await super.solicitarDataBase({ where: { descricao: receitasDescricao } })
        let resp = [];
        dbreceitassDescricao.forEach((obj) => {
            let outrasDatas = Number(obj.dataValues.data.slice(5, 7));
            let dataAtualizada = Number(receitasData.slice(5, 7));
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
    /* Verificar receitas duplicadas pelas descrições e checar Id */
    async checkReceitasDuplicadaPorId(descricao, data, id) {
        const dbreceitassDescricao = await super.solicitarDataBase({ where: { descricao: descricao } })
        const dbreceitasId = await super.solicitarDataBasePorId({ where: { id: Number(id) } })
        let resp = [];

        dbreceitassDescricao.forEach((obj) => {
            if (Number(obj.dataValues.id) !== Number(id)) {
                if (dbreceitasId[0].dataValues.descricao === obj.dataValues.descricao) {
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
    async listarReceitasPorAnoMes({ ano, mes }) {
        const receitas = await super.solicitarDataBase();
        let checkData = []
        if (ano && mes) {
            receitas.forEach(obj => {
                for (let i = 0; i <= 30; i++) {
                    if (obj.dataValues.data.includes(`${ano}-${mes}-${i}`)) {
                        checkData.push(obj);
                    }
                }
            })
        } else if (ano) {
            let contMes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
            receitas.forEach(obj => {
                contMes.map(mes => {
                    for (let i = 0; i <= 30; i++) {
                        if (obj.dataValues.data.includes(`${ano}-${mes}-${i}`)) {
                            checkData.push(obj);
                        }
                    }
                })
            })
        }
        if (Object.values(checkData).length === 0) {
            throw new Error(`Não há receitas com a data informada!`)
        } else {
            return checkData
        }        
    }

}

module.exports = ReceitasServices