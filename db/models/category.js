module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define(
    "category",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "category",
      timestamps: false,
    }
  );
  return category;
};
