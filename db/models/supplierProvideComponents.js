module.exports = (sequelize, Sequelize) => {
    const supplier_provide_cmponents = sequelize.define(
      "supplier_provide_cmponents",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          field: "id",
        },
        Supplier_idSupplier: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Supplier_idSupplier",
          // references: {
          //   model: 'Supplier',
          //   key: 'Supplier_idSupplier'
          // }
        },
        idMotherboard: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Motherboard_idMotherboard",
          // references: {
          //   model: 'motherboard',
          //   key: 'Motherboard_idMotherboard'
          // }
        },
        idCpu: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Cpu_idCpu",
          // references: {
          //   model: 'cpu',
          //   key: 'Cpu_idCpu'
          // }
        },
        idgraphic: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Graphic_Card_idGraphic_Card",
          // references: {
          //   model: 'graphic_card',
          //   key: 'Graphic_Card_idGraphic_Card'
          // }
        },
        idCabinet: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Cabinet_idCabinet",
          // references: {
          //   model: 'cabinet',
          //   key: 'Cabinet_idCabinet'
          // }
        },
        Power_Supply_idPower_Supply: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Power_Supply_idPower_Supply",
          // references: {
          //   model: 'power_supply',
          //   key: 'Power_Supply_idPower_Supply'
          // }
        },
        idRam: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Ram_idRam",
          // references: {
          //   model: 'ram',
          //   key: 'Ram_idRam'
          // }
        },
        idCooling_System: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Cooling_System_idCooling_System",
          // references: {
          //   model: 'cooling_system',
          //   key: 'Cooling_System_idCooling_System'
          // }
        },
        idStorage: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Storage_idStorage",
          // references: {
          //   model: 'storage',
          //   key: 'Storage_idStorage'
          // }
        },
        Quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "Quantity",
        },
        Cost: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          field: "Cost",
        },
        DateOfPurchase: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          field: "DateOfPurchase",
        },
        purchase_staus: {
          type: Sequelize.STRING,
          allowNull: false,
          field: "Status",
        }
      },
      {
        tableName: "supplier_provide_cmponents",
        timestamps: false,
      }
    );

    supplier_provide_cmponents.associate = (models) => {
      // associations can be defined here
      supplier_provide_cmponents.belongsTo(models.supplier, { as: 'supplier', foreignKey: 'Supplier_idSupplier' });
      supplier_provide_cmponents.belongsTo(models.cabinet, { as: 'cabinet', foreignKey: 'Cabinet_idCabinet' });
      supplier_provide_cmponents.belongsTo(models.motherboard, { as: 'motherboard', foreignKey: 'Motherboard_idMotherboard' });
      supplier_provide_cmponents.belongsTo(models.cpu, { as: 'cpu', foreignKey: 'Cpu_idCpu' });
      supplier_provide_cmponents.belongsTo(models.ram, { as: 'ram', foreignKey: 'Ram_idRam' });
      supplier_provide_cmponents.belongsTo(models.cooling_system, { as: 'cooling_system', foreignKey: 'Cooling_System_idCooling_System' });
      supplier_provide_cmponents.belongsTo(models.graphic_card, { as: 'graphic_card', foreignKey: 'Graphic_Card_idGraphic_Card' });
      supplier_provide_cmponents.belongsTo(models.power_supply, { as: 'power_supply', foreignKey: 'Power_Supply_idPower_Supply' });
      supplier_provide_cmponents.belongsTo(models.storage, { as: 'storage', foreignKey: 'Storage_idStorage' });
    };
    return supplier_provide_cmponents;
  };

  