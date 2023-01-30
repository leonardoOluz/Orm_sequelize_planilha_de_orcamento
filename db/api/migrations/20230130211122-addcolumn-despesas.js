'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Despesas', 'categoria', {    
        type: Sequelize.STRING      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Despesas','categoria');
  }
}