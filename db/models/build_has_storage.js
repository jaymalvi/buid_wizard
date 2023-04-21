module.exports = (sequelize, Sequelize) => {
    const build_has_storage = sequelize.define(
      "build_has_storage",
      {
        // id: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        //   primaryKey: true,
        //   autoIncrement: true
        // },
        Storage_idStorage: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "Storage_idStorage",
    
        },
        Builds_idBuilds: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "Builds_idBuilds",
          
        }
      },
      {
        tableName: "builds_has_ram",
        timestamps: false,
      }
    );
    build_has_storage.associate = (models) => {
        // associations can be defined here
        build_has_storage.belongsTo(models.storage, { as: 'storage', foreignKey: 'Storage_idStorage' });
        build_has_storage.belongsTo(models.product, { as: 'product', foreignKey: 'Builds_idBuilds' });
      };
    return build_has_storage;
  };
