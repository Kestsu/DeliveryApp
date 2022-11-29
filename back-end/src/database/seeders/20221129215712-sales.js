'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'sales',
      [
        {
          id: 1,
          user_id: 3,
          seller_id: 2,
          total_price: 9.7,
          delivery_address: 'Logo alí',
          delivery_number: '13',
          sale_date: new Date(),
          status: 'Pendente',
        },
        {
          id: 2,
          user_id: 3,
          seller_id: 2,
          total_price: 9.99,
          delivery_address: 'Logo alí',
          delivery_number: '13',
          sale_date: new Date(),
          status: 'Entregue',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
