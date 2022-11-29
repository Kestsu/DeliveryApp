const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    'SalesProducts',
    {
      saleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'salesProducts',
      underscored: true,
      timestamps: false,
    },
  );

  return SalesProducts;
};

module.exports = SalesProductsModel;
