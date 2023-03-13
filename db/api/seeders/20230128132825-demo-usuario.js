'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Lucca Luz',
        email: "lucca@email",
        sal: "LuccaTestando",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ana Lima',
        email: "ana@email",
        sal: "LuccaTestando",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Vania Amorim',
        email: "vania@email",
        sal: "LuccaTestando",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Rosangela Alves',
        email: "rosangela@email",
        sal: "LuccaTestando",
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
