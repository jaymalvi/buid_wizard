module.exports = (sequelize, Sequelize) => {
    const delivery = sequelize.define(
      "delivery",
      {
        idDelivery: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: true,
          field: "idDelivery",
        },
        DeliveryPerson: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "DeliveryPerson",
        },
        DeliveryDate: {
          type: Sequelize.DATE,
          allowNull: true,
          field: "DeliveryDate",
        },
        DeliveryStatus: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "DeliveryStatus",
        },
        DeliveryAddress: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "DeliveryAddress",
        },
        DeliveryCost: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "DeliveryCost",
        }
      },
      {
        tableName: "delivery",
        timestamps: false,
      }
    );
    return delivery;
  };
  