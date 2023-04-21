module.exports = (sequelize, Sequelize) => {
    const storage = sequelize.define(
      "storage",
      {
        idstorage: {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true,
          field: "idStorage",
        },
        NameStorage: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Name",
        },
        item: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "item",
        },
        PriceStorage: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "Price",
        },
        descriptionStorage: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Description",
        },
        storage_speed: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Storage_Speed",
        },
        storage_type: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Storage_Type",
        },
        storage_size: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Storage_Size",
        },
        cabinet_ImageURL: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "ImageUrl",
        },
        read_speed: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Read_Speed",
        },
        write_speed: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Write_Speed",
        },
        quantityStorage: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Stock",
        },
        supplierId: {
          field: "supplierId",
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        tableName: "storage",
        timestamps: false,
      }
    );
    storage.associate = (models) => {
      // associations can be defined here
      storage.hasMany(models.build_has_storage, { as: 'build_has_storage', foreignKey: 'Storage_idStorage' });
    };
    return storage;
  };
  