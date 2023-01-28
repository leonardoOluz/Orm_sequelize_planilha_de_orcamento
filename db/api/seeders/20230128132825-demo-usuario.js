'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Lucca Luz',
        email: "lucca@email",
        senha: "LuccaTestando",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ana Lima',
        email: "ana@email",
        senha: "AnaTestando",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Vania Amorim',
        email: "vania@email",
        senha: "VaniaTestando",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Rosangela Alves',
        email: "rosangela@email",
        senha: "RosangelaTestando",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
