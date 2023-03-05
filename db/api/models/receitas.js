'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Receitas.belongsTo(models.Usuario, { foreignKey: 'usuario_Id' })
      // define association here
    }
  }
  Receitas.init({
    descricao: {
      type: DataTypes.STRING,
      validate: {
        validarDescricao: function (dado) {
          if (dado === '') {
            throw new Error('O campo descrição é obrigatório')
          }
        }
      }

    },
    valor: {
      type: DataTypes.FLOAT,
      validate: {
        validarDescricao: function (dado) {
          if (dado === '') {
            throw new Error('O campo valor é obrigatório')
          }
        }
      }
    },
    data: {
      type: DataTypes.DATEONLY,
      validate: {
        validarDescricao: function (dado) {
          if (dado === '') {
            throw new Error('O campo data é obrigatório')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Receitas',
  });
  return Receitas;
};