module.exports = (sequelize, Sequelize) => {
    const offer = sequelize.define(
      "offer",
      {
        idOffers: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: "idOffers",
        },
        offer_name: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        DsicountPercentage: {
          type: Sequelize.DECIMAL(10, 0),
          allowNull: true
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: true
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: true
        },
        MinimumAmount: {
          type: Sequelize.DECIMAL(10, 0),
          allowNull: true,
          field: "MinimumAmount"
        },
        PromoCode: {
          type: Sequelize.STRING(50),
          allowNull: true
        }
      },
      {
        tableName: "offer",
        timestamps: false,
      }
    );
    return offer;
  };
