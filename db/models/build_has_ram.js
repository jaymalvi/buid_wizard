module.exports = (sequelize, Sequelize) => {
    const builds_has_ram = sequelize.define(
      "builds_has_ram",
      {
        // id: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        //   primaryKey: true,
        //   autoIncrement: true
        // },
        Ram_idRam: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "Ram_idRam",
    
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
    builds_has_ram.associate = (models) => {
        // associations can be defined here
        builds_has_ram.belongsTo(models.ram, { as: 'ram', foreignKey: 'Ram_idRam' });
        builds_has_ram.belongsTo(models.product, { as: 'product', foreignKey: 'Builds_idBuilds' });
      };
    return builds_has_ram;
  };
