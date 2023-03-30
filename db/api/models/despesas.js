'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Despesas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Despesas.belongsTo(models.Usuario, { foreignKey: 'usuario_Id' })
      // define association here
    }
  }
  Despesas.init({
    descricao: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function (dado) {
          if (dado === '') {
            throw new Error('o campo descrição é obrigatório')
          }
        }
      }
    },
    valor: {
      type: DataTypes.FLOAT,
      validate: {
        funcaoValidadora: function (dado) {
          if (dado === '') {
            throw new Error('o campo valor é obrigatório')
          }
        }
      }
    },
    data: {
      type: DataTypes.DATEONLY,
      validate: {
        funcaoValidadora: function (dado) {
          if (dado === '') {
            throw new Error('o campo data é obrigatório')
          }
        }
      }
    },
    categoria: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function (dado) {
          if (dado === '') {
            this.categoria = 'Outras'
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Despesas',
  });
  return Despesas;
};