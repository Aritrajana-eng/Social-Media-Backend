'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "USER_CREDENTIALs",
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      from_year: {
        type: Sequelize.DATE
      },
      to_year: {
        type: Sequelize.DATE
      },
      job_designation: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },  
      company_address: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_jobs');
  }
};