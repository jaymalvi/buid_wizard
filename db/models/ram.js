module.exports = (sequelize, Sequelize) => {
    const ram = sequelize.define(
      "ram",
      {
        idRam: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: true,
          field: "idRam",
        },
        NameRam: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Name",
        },
        PriceRam: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Price",
        },
        descriptionRam: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Description",
        },
        memory_sizeRam: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Memory_Size",
        },
        memory_speed: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Memory_Speed",
        },
        memory_typeRam: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Memory_Type",
        },
        cabinet_ImageURL: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "ImageUrl",
        },
        quantityRam: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Stock",
        },
        item: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "item",
        },
        supplierId: {
          field: "supplierId",
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      },
      {
        tableName: "ram",
        timestamps: false,
      }
    );
    ram.associate = (models) => {
      // associations can be defined here
      ram.hasMany(models.builds_has_ram, { as: 'builds_has_ram', foreignKey: 'Ram_idRam' });
    };
    return ram;
  };
  