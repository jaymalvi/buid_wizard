module.exports = (sequelize, Sequelize) => {
  const cabinet = sequelize.define(
    "cabinet",
    {
      idCabinet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "idCabinet",
      },
      NameCabinet: {
        field: "Name",
        type: Sequelize.STRING,
        allowNull: true,
      },
      item: {
        field: "item",
        type: Sequelize.STRING,
        allowNull: true,
      },
      cabinet_ImageURL: {
        field: "ImageURL",
        type: Sequelize.STRING,
        allowNull: true,
      },
      Form_Factor: {
        field: "Form_Factor",
        type: Sequelize.STRING,
        allowNull: true,
      },
      Dimensions: {
        field: "Dimensions",
        type: Sequelize.STRING,
        allowNull: true,
      },
      Material: {
        field: "Material",
        type: Sequelize.STRING,
        allowNull: true,
      },
      NoOfBayes: {
        field: "NoOfBayes",
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      NoOfFans: {
        field: "NoOfFans",
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Pricecabinet: {
        field: "Price",
        type: Sequelize.DECIMAL(10, 0),
        allowNull: true,
      },
      quantityCabinet: {
        field: "quantity",
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "cabinet",
      timestamps: false,
    }
  );
  return cabinet;
};
