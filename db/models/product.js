module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "product",
    {
      idBuilds: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      chipset: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ScreenSize: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: true,
      },
      NoOfFans: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isBuild: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      Cabinet_idCabinet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cabinet",
          key: "idCabinet",
        },
      },
      Motherboard_idMotherboard: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "motherboard", // name of the referenced table
          key: "idMotherboard", // name of the referenced column
        },
      },
      Cpu_idCpu: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cpu",
          key: "idCpu",
        },
      },
      ram_idRam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ram",
          key: "idRam",
        },
      },
      Cooling_System_idCooling_System: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cooling_system",
          key: "idCooling_System",
        },
      },

      Graphic_Card_idGraphic_Card: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "graphic_card",
          key: "idGraphic_Card",
        },
      },
      Power_Supply_idPower_Supply: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "power_supply",
          key: "idPower_Supply",
        },
      },
      Storage_idStorage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "storage",
          key: "idStorage",
        },
      },
    },
    {
      tableName: "product",
      timestamps: false,
    }
  );
  return product;
};
