'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BCostumers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_number: {
        type: Sequelize.STRING
      },
      rtn: {
        type: Sequelize.STRING
      },
      full_name: {
        type: Sequelize.STRING
      },
      b_name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      b_phone: {
        type: Sequelize.STRING
      },
      adress: {
        type: Sequelize.STRING
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: 
        {
          model: 'Users',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BCostumers');
  }
};