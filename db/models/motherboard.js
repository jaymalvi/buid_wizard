module.exports = (sequelize, Sequelize) => {
    const motherboard = sequelize.define(
      "motherboard",
      {
        idMotherboard: {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true,
          field: "idMotherboard",
        },
        nameMotherboard: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "name",
        },
        item: {
            type: Sequelize.STRING,
            allowNull: true,
            field: "item",
          },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "description",
        },
        cabinet_ImageURL: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "ImageUrl",
        },
        priceMotherboard: {
          type: Sequelize.DECIMAL,
          allowNull: true,
          field: "price",
        },
        cpu_socket: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "cpu_socket",
        },
        ram_slots: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "ram_slots",
        },
        max_ram_capacity: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "max_ram_capacity",
        },
        pci_slots: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "pci_slots",
        },
        sata_ports: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "sata_ports",
        },
        usb_ports: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "usb_ports",
        },
        ethernet_port: {
          type: Sequelize.TINYINT,
          allowNull: true,
          field: "ethernet_port",
        },
        wifi_module: {
          type: Sequelize.TINYINT,
          allowNull: true,
          field: "wifi_module",
        },
        bluetooth_module: {
          type: Sequelize.TINYINT,
          allowNull: true,
          field: "bluetooth_module",
        },
        quantityMotherboard: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "Stock",
        },
        supplierId: {
          field: "supplierId",
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      },
      {
        tableName: "motherboard",
        timestamps: false,
      }
    );
    return motherboard;
  };
  