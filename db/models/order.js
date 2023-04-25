module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define(
      "order",
      {
        idOrder: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          field: "idOrder"
        },
        User_idUser: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "User_idUser"
        },
        Amount: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          field: "Amount"
        },
        Date: {
          type: Sequelize.DATE,
          allowNull: false,
          field: "Date"
        },
        RefundStatus: {
          type: Sequelize.TINYINT,
          allowNull: true,
          field: "RefundStatus"
        },
        OrderStatus: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "OrderStatus"
        },
        Payment_idPayment: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "Payment_idPayment"
        },
        Delivery_idDelivery: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "Delivery_idDelivery"
        },
        Offers_idOffers: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "Offers_idOffers"
        }
      },
      {
        tableName: "order",
        timestamps: false,
      }
    );
    order.associate = (models) => {
        // associations can be defined here
        order.belongsTo(models.user, { as: 'user', foreignKey: 'User_idUser' });
        order.belongsTo(models.payment, { as: 'payment', foreignKey: 'Payment_idPayment' });
        order.belongsTo(models.delivery, { as: 'delivery', foreignKey: 'Delivery_idDelivery' });
        order.belongsTo(models.offer, { as: 'offer', foreignKey: 'Offers_idOffers' });
        order.hasMany(models.order_has_products, { as: 'order_has_products', foreignKey: 'Builds_idBuilds' });
      };
    return order;
  };
