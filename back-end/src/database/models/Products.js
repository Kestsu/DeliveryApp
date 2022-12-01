const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      price: {
        type: DataTypes.DECIMAL(4, 2),
      },
      urlImage: {
        type: DataTypes.STRING(200),
      },
    },
    {
      tableName: 'products',
      underscored: true,
      timestamps: false,
    },
  );

  Product.associate = (models) => {
    Product.belongsToMany(models.Sale, {
      through: 'SalesProducts',
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return Product;
};

module.exports = ProductModel;
