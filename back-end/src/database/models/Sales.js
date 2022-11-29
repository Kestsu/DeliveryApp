const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      sellerId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
      },
      deliveryAddress: {
        type: DataTypes.STRING(100),
      },
      deliveryNumber: {
        type: DataTypes.STRING(100),
      },
      saleDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING(50),
      },
    },
    {
      tableName: 'sales',
      underscored: true,
      timestamps: false,
    },
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Sale.belongsTo(models.User, { as: 'seller', foreignKey: 'sellerId' });
    Sale.belongsToMany(models.Product, { through: 'SalesProducts' });
  };

  return Sale;
};

module.exports = SaleModel;
