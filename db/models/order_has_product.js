module.exports = (sequelize, Sequelize) => {
    const order_has_products = sequelize.define(
      "order_has_products",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        Order_idOrder: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "Order_idOrder",
    
        },
        Builds_idBuilds: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "Builds_idBuilds",
          
        }
      },
      {
        tableName: "order_has_products",
        timestamps: false,
      }
    );
    order_has_products.associate = (models) => {
        // associations can be defined here
        order_has_products.belongsTo(models.order, { as: 'order', foreignKey: 'Order_idOrder' });
        order_has_products.belongsTo(models.product, { as: 'product', foreignKey: 'Builds_idBuilds' });
      };
    return order_has_products;
  };
