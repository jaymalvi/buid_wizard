module.exports = (sequelize, Sequelize) => {
    const graphic_card = sequelize.define(
      "graphic_card",
      {
        idgraphic: {
          type: Sequelize.INTEGER,
          allowNull: true,
          autoIncrement: true,
          primaryKey: true,
          field: "idGraphic_Card",
        },
        Name: {
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
        chipset: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "Chipset",
        },
        memory_typeGraphic: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "MemoryTytpe",
        },
        memory_sizeGraphic: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "MemorySize",
        },
        core_clock: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "CoreClock",
        },
        power_consumtionGraphic: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "PowerConsumption",
        },
        PriceGraphic: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "Price",
        },
        quantityGraphic: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Stock",
        }
      },
      {
        tableName: "graphic_card",
        timestamps: false,
      }
    );
    return graphic_card;
  };
  