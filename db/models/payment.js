module.exports = (sequelize, Sequelize) => {
    const payment = sequelize.define(
      "payment",
      {
        idPayment: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          field: "idPayment",
        },
        TransactionID: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "TransactionID",
        },
        Amount: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "Amount",
        },
        Date: {
          type: Sequelize.DATE,
          allowNull: true,
          field: "Date",
        },
        PaymentMethod: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "PaymentMethod",
        },
      },
      {
        tableName: "payment",
        timestamps: false,
      }
    );
    return payment;
  };
