'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Receitas', [
      {
        descricao: "Salário",
        valor: 1350.40,
        data: "2023-01-29",
        usuario_Id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descricao: "Fre-Lance",
        valor: 550.5,
        data: "2023-01-30",
        usuario_Id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Receitas', null, {});

  }
};
