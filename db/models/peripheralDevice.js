module.exports = (sequelize, Sequelize) => {
    const peripheral = sequelize.define(
      "peripheral",
      {
        idperipheral: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: true,
          field: "idPeripheral",
        },
        Nameperipheral: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "name",
        },
        item: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "item",
        },
        dropdownPeripheralDevice: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "PeripheralDeviceName",
        },
        descriptionPeripheral: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "description",
        },
        cabinet_ImageURL: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "image_url",
        },
        Priceperipheral: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "price",
        },
        quantityperipheral: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "quantity",
        },
        supplierId: {
          field: "supplierId",
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      },
      {
        tableName: "peripheral",
        timestamps: false,
      }
    );
    return peripheral;
  };
  