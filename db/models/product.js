module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "product",
    {
      idBuilds: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "idBuilds",
      },
      name: {
        type: Sequelize,
        allowNull: true,
        field: "name",
      },
      chipset: {
        type: Sequelize,
        allowNull: false,
        field: "chipset",
      },
      ScreenSize: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: "ScreenSize",
      },
      NoOfFans: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "NoOfFans",
      },
      isBuild: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: "isBuild",
      },
      Motherboard_idMotherboard: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "Motherboard_idMotherboard",
      },
      Cooling_System_idCooling_System: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "Cooling_System_idCooling_System",
      },
      Cpu_idCpu: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "Cpu_idCpu",
      },
      Ram_idRam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "Ram_idRam",
      },
      Graphic_Card_idGraphic_Card: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "Graphic_Card_idGraphic_Card",
      },
      Cabinet_idCabinet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "Cabinet_idCabinet",
      },
      Power_Supply_idPower_Supply: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "Power_Supply_idPower_Supply",
      },
      Storage_idStorage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "Storage_idStorage",
      }
    },
    {
      tableName: "product",
      timestamps: false,
    }
  );
  product.associate = (models) => {
    // associations can be defined here
    product.belongsTo(models.cabinet, { as: 'cabinet', foreignKey: 'Cabinet_idCabinet' });
    product.belongsTo(models.motherboard, { as: 'motherboard', foreignKey: 'Motherboard_idMotherboard' });
    product.belongsTo(models.cpu, { as: 'cpu', foreignKey: 'Cpu_idCpu' });
    product.belongsTo(models.ram, { as: 'ram', foreignKey: 'Ram_idRam' });
    product.belongsTo(models.cooling_system, { as: 'cooling_system', foreignKey: 'Cooling_System_idCooling_System' });
    product.belongsTo(models.graphic_card, { as: 'graphic_card', foreignKey: 'Graphic_Card_idGraphic_Card' });
    product.belongsTo(models.power_supply, { as: 'power_supply', foreignKey: 'Power_Supply_idPower_Supply' });
    product.belongsTo(models.storage, { as: 'storage', foreignKey: 'Storage_idStorage' });
    product.hasMany(models.order_has_products, { as: 'order_has_products', foreignKey: 'Builds_idBuilds' });
    product.hasMany(models.order_has_products, { as: 'builds_has_ram', foreignKey: 'Builds_idBuilds' });
    product.hasMany(models.order_has_products, { as: 'build_has_storage', foreignKey: 'Builds_idBuilds' });
  };
  return product;
};
