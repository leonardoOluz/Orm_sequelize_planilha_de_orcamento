'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.Receitas, { foreignKey: 'usuario_Id' })
      Usuario.hasMany(models.Despesas, { foreignKey: 'usuario_Id' })
      // define association here
    }
  }
  Usuario.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function (dado) {
          if (dado.length < 3) {
            throw new Error('o campo nome deve ter mais de 3 caracteres')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dado do tipo e-mail inválido'
        }
      }
    },
    senha: {
      type: DataTypes.STRING(16),
      validate: {
        funcaoValidarSenha: function (dado) {
          if (dado.length < 12) {
            throw new Error(`Senha fraca, verifique a senha digitada!`)
          }
        }
      }
    },
    ativo:
    {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
        checkAtivo: function (ativo) {
          console.log(ativo)
          if (ativo === '') {
            this.ativo = true
          } else if (ativo === undefined) {
            throw new Error('Campo ativo é necessário')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};