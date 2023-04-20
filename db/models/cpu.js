module.exports = (sequelize, Sequelize) => {
    const cpu = sequelize.define(
      "cpu",
      {
        idCpu: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: "idCpu",
        },
        NameCPU: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Name",
        },
        item: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "item",
        },
        cabinet_ImageURL: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "ImageUrl",
        },
        socket_type: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Socket_Type",
        },
        number_of_cores: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "NoOfCores",
        },
        clock_speed: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "ClockSpeed",
        },
        cache_size: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "CacheSize",
        },
        power_consumtionCPU: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "PowerConsumption",
        },
        PriceCPU: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "Price",
        },
        quantityCPU: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Stock",
        },supplierId: {
          field: "supplierId",
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      },
      {
        tableName: "cpu",
        timestamps: false,
      }
    );
    return cpu;
  };
  