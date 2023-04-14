module.exports = (sequelize, Sequelize) => {
  const cooling_system = sequelize.define(
    "cooling_system",
    {
      idCooling_System: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        field: "idCooling_System",
      },
      NameColling: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "Name",
      },
      item: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "item",
      },
      PriceColling: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: "Price",
      },
      cabinet_ImageURL: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "ImageURL",
      },
      coollingType: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "Type",
      },
      fan: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: "Fan_Speed",
      },
      quantityColling: {
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
      tableName: "cooling_system",
      timestamps: false,
    }
  );
  return cooling_system;
};
