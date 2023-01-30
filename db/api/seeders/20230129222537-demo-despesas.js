'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Despesas', [
      {
        categoria: "Moradia",
        descricao: "Aluguel",
        valor: 650.50,
        data: "2023-01-29",
        usuario_Id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoria: "Outras",
        descricao: "Prestação do carro",
        valor: 390.55,
        data: "2023-01-30",
        usuario_Id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Despesas', null, {});
    
  }
};
