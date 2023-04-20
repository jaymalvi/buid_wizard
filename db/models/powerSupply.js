module.exports = (sequelize, Sequelize) => {
    const power_supply = sequelize.define(
      "power_supply",
      {
        idpower: {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true,
          field: "idPower_Supply",
        },
        NamePower: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Name",
        },
        item: {
            type: Sequelize.STRING,
            allowNull: true,
            field: "item",
          },
        descriptionPower: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Description",
        },
        cabinet_ImageURL: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "ImageUrl",
        },
        PricePower: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "Price",
        },
        wattage: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Wattage",
        },
        quantityPower: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
          field: "Stock",
        },
        supplierId: {
          field: "supplierId",
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        tableName: "power_supply",
        timestamps: false,
      }
    );
    return power_supply;
  };
  