const Services = require('./Services.js')

class ReceitasServices extends Services {
    constructor() {
        super('Receitas')
    }

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
    async atualizarReceitasporId(dados, id) {
        const { descricao, data } = dados;
        if (await this.checkReceitasDuplicadaPorId(descricao, data, id)) {
            return await super.modificarDataBasePorId(dados, { where: { id: Number(id) } })
        } else {
            throw new Error(`Existe uma data repetida no mesmo mês!`)
        }

    }
    async criarReceitaNova(dados) {
        const { descricao, data } = dados;
        if (await this.checkReceitasDuplicada(descricao, data)) {
            return await super.criarDataBase(dados);
        } else {
            throw new Error(`Existe uma data repetida no mesmo mês!`);
        }
    }

}

module.exports = ReceitasServices