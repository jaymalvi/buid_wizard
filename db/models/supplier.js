module.exports = (sequelize, Sequelize) => {
    const supplier = sequelize.define(
      "supplier",
      {
        idSupplier: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: "idSupplier",
        },
        Name: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Name",
        },
        Mobile: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "Mobile",
        },
        Email: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Email",
        },
        Address: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Address",
        }
      },
      {
        tableName: "supplier",
        timestamps: false,
      }
    );
    return supplier;
  };
