const Services = require('./Services.js')

class ReceitasServices extends Services {
    constructor() {
        super('Receitas')
    }

    async checkReceitaDuplicada(receitaDescricao, id, receitaData) {
        const dbReceitasDescricao = await super.solicitarDataBase({ where: { descricao: receitaDescricao } })
        const dbReceitaId = await super.solicitarDataBasePorId({ where: { id: Number(id) } })
        let resp = [];
        dbReceitasDescricao.forEach((obj) => {
            if (Number(obj.dataValues.id) !== Number(id)) {
                if (dbReceitaId[0].dataValues.descricao === obj.dataValues.descricao) {
                    let outrasDatas = Number(obj.dataValues.data.slice(5, 7));
                    let dataAtualizada = Number(receitaData.slice(5, 7));
                    if (outrasDatas === dataAtualizada) {
                        resp.push(outrasDatas);
                    }
                }
            }
        });
        if (Object.keys(resp).length === 0) {
            return true
        } else {
            return false
        }
    }
}

module.exports = ReceitasServices