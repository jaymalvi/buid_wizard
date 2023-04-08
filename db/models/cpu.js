module.exports = (sequelize, Sequelize) => {
    const cpu = sequelize.define(
      "cpu",
      {
        idCpu: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        Name: {
          type: Sequelize.STRING,
          allowNull: true
        },
        item: {
          type: Sequelize.STRING,
          allowNull: true
        },
        image_URL: {
          type: Sequelize.STRING,
          allowNull: true
        },
        Socket_Type: {
          type: Sequelize.STRING,
          allowNull: true
        },
        NoOfCores: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        ClockSpeed: {
          type: Sequelize.DECIMAL,
          allowNull: true
        },
        CacheSize: {
          type: Sequelize.DECIMAL,
          allowNull: true
        },
        PowerConsumption: {
          type: Sequelize.DECIMAL,
          allowNull: true
        },
        Price: {
          type: Sequelize.DECIMAL,
          allowNull: true
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      },
      {
        tableName: "cpu",
        timestamps: false,
      }
    );
    return cpu;
  };
  