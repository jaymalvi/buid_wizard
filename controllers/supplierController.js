const { response } = require("express");
const db = require("../db/index");
const supplier = require("../db/models/supplier");

const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.findAll = async function (req, res) {
  const supplier = await db.supplier.findAll({ raw: true });
  console.log(supplier);
  return res.render("pages/suppliers.ejs", {
    supplier,
    userData: req.session && req.session.user ? req.session.user : null,
  });
};

exports.ShowBuyItemProvidedBySupllier = async function (req, res) {
  const ShowItemProvidedBySupllier =
    await db.supplier_provide_cmponents.findAll({
      include: [
        {
          model: db.supplier,
          as: "supplier",
        },
      ],
      raw: true,
    });
  console.log(ShowItemProvidedBySupllier);
  return res.render("pages/itemProvidedBySupplier.ejs", {
    ShowItemProvidedBySupllier,
    userData: req.session && req.session.user ? req.session.user : null,
  });
};

exports.ShowOrder = async function (req, res) {
  console.log(req.session)
  const ShowOrder = await db.supplier_provide_cmponents.findAll({
    include: [
      {
        model: db.supplier,
        as: "supplier",
      },
      {
        model: db.cabinet,
        as: "cabinet",
      },
      {
        model: db.motherboard,
        as: "motherboard",
      },
      {
        model: db.cpu,
        as: "cpu",
      },
      {
        model: db.ram,
        as: "ram",
      },
      {
        model: db.cooling_system,
        as: "cooling_system",
      },
      {
        model: db.graphic_card,
        as: "graphic_card",
      },
      {
        model: db.power_supply,
        as: "power_supply",
      },
      {
        model: db.storage,
        as: "storage",
      },
    ],
    raw: true,
    where: { '$supplier.idSupplier$': req.session.user.idSupplier, Status: "Pending" },
  });
  console.log(ShowOrder);
  return res.render("pages/supllier/order.ejs", {
    ShowOrder,
    userData: req.session && req.session.user ? req.session.user : null,
  });
};

exports.viewItem = async function (req, res) {
  console.log("++++", req.session.user, req.query.id, req.quary);
  req.body.cabinet_ImageURL =
    req.file && req.file.originalname ? req.file.originalname : "";
  const cabinet = await db.cabinet.findAll({
    raw: true,
    where: { supplierId: req.query.id },
  });
  console.log(cabinet);
  const motherboard = await db.motherboard.findAll({
    raw: true,
    where: { supplierId: req.query.id },
  });
  console.log(motherboard);
  const cpu = await db.cpu.findAll({
    raw: true,
    where: { supplierId: req.query.id },
  });
  console.log(cpu);
  const ram = await db.ram.findAll({
    raw: true,
    where: { supplierId: req.query.id },
  });
  console.log(ram);
  const cooling_system = await db.cooling_system.findAll({
    raw: true,
    where: { supplierId: req.query.id },
  });
  console.log(cooling_system);
  const graphic_card = await db.graphic_card.findAll({
    raw: true,
    where: { supplierId: req.query.id },
  });
  console.log(graphic_card);
  const power_supply = await db.power_supply.findAll({
    raw: true,
    where: { supplierId: req.query.id },
  });
  console.log(power_supply);
  const storage = await db.storage.findAll({
    raw: true,
    where: { supplierId: req.query.id },
  });
  console.log(storage);
  const peripheral = await db.peripheral.findAll({
    raw: true,
    where: { supplierId: req.query.id },
  });
  console.log(peripheral);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>..", req.query.id);
  return res.render("pages/viewCabinet.ejs", {
    supplierId: req.query.id,
    cabinet,
    motherboard,
    cpu,
    ram,
    cooling_system,
    graphic_card,
    power_supply,
    storage,
    peripheral,
    userData: req.session && req.session.user ? req.session.user : null,
  });
};

exports.create = async function (req, res) {
  console.log(req.body);
  try {
    const supplier = await db.supplier.create(req.body);
    return res.redirect("/supplier");
  } catch (e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
};

exports.supplierComponent = async function (req, res) {
  console.log(req.body);
  try {
    req.body.Supplier_idSupplier = req.body.supplier_id;
    req.body.Cost = req.body.Cost;
    req.body.Cabinet_idCabinet = req.body.idCabinet;
    req.body.Motherboard_idMotherboard = req.body.idMotherboard;
    req.body.Cpu_idCpu = req.body.idCpu;
    req.body.Ram_idRam = req.body.idRam;
    req.body.Cooling_System_idCooling_System = req.body.idCooling_System;
    req.body.Graphic_Card_idGraphic_Card = req.body.idgraphic;
    req.body.Power_Supply_idPower_Supply = req.body.idpower;
    req.body.Storage_idStorage = req.body.isStorage;
    req.body.DateOfPurchase = new Date();
    req.body.Status = req.body.purchase_staus;
    delete req.body.id;
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX >>>", req.body);
    const supplier_provide_cmponents =
      await db.supplier_provide_cmponents.create(req.body);
    console.log(
      "supplier_provide_cmponents >>>>>>. ",
      supplier_provide_cmponents
    );
    return res.redirect("/supplier/showItem");
  } catch (e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
};

exports.update = async function (req, res) {
  console.log(req.body);
  try {
    const supplier = await db.supplier.update(req.body, {
      where: {
        idSupplier: req.body.idSupplier,
      },
    });
    return res.redirect("/supplier");
  } catch (e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
};

exports.findOne = async function (req, res) {
  const supplier = await db.supplier.findOne({
    where: { idSupplier: req.params.id },
    raw: true,
  });
  console.log(supplier);
  return res.render("pages/addSupplier.ejs", {
    supplier,
    userData: req.session && req.session.user ? req.session.user : null,
  });
};

exports.viewOrder = async function (req, res) {
  const supplier = await db.supplier.findOne({
    where: { idSupplier: req.params.id },
    raw: true,
  });
  console.log(supplier);
  return res.render("pages/addSupplier.ejs", {
    supplier,
    userData: req.session && req.session.user ? req.session.user : null,
  });
};

exports.updateStatusBySupplier = async function (req, res) {
  const supplier = await db.supplier.findOne({
    where: { idSupplier: req.params.id},
    raw: true,
  });
  console.log(supplier);
  return res.render("pages/addSupplier.ejs", {
    supplier,
    userData: req.session && req.session.user ? req.session.user : null,
  });
};

exports.BuyItem = async function (req, res) {
  console.log("-----------", req.params, req.query);
  if (req.query && req.query.id && req.query.id == "cabinet") {
    const cabinet = await db.cabinet.findOne({
      where: { idCabinet: req.params.id },
      raw: true,
    });
    console.log("cabinet >>>>>>>>>", cabinet);
    return res.render("pages/buy.ejs", {
      supplierId: req.query.supplierId,
      isCabinet: true,
      data: cabinet,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  } else if (req.query && req.query.id && req.query.id == "motherboard") {
    const motherboard = await db.motherboard.findOne({
      where: { idMotherboard: req.params.id },
      raw: true,
    });
    console.log(motherboard);
    return res.render("pages/buy.ejs", {
      supplierId: req.query.supplierId,
      isMotherboard: true,
      data: motherboard,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  } else if (req.query && req.query.id && req.query.id == "cpu") {
    const cpu = await db.cpu.findOne({
      where: { idCpu: req.params.id },
      raw: true,
    });
    console.log(cpu);
    return res.render("pages/buy.ejs", {
      supplierId: req.query.supplierId,
      isCpu: true,
      data: cpu,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  } else if (req.query && req.query.id && req.query.id == "ram") {
    const ram = await db.ram.findOne({
      where: { idRam: req.params.id },
      raw: true,
    });
    console.log(ram);
    return res.render("pages/buy.ejs", {
      supplierId: req.query.supplierId,
      isRam: true,
      data: ram,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  } else if (req.query && req.query.id && req.query.id == "colling") {
    const cooling_system = await db.cooling_system.findOne({
      where: { idCooling_System: req.params.id },
      raw: true,
    });
    console.log(cooling_system);
    return res.render("pages/buy.ejs", {
      supplierId: req.query.supplierId,
      isColling: true,
      data: cooling_system,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  } else if (req.query && req.query.id && req.query.id == "graphiccard") {
    const graphic_card = await db.graphic_card.findOne({
      where: { idGraphic_Card: req.params.id },
      raw: true,
    });
    console.log(graphic_card);
    return res.render("pages/buy.ejs", {
      supplierId: req.query.supplierId,
      isGraphic: true,
      data: graphic_card,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  } else if (req.query && req.query.id && req.query.id == "powersupply") {
    const power_supply = await db.power_supply.findOne({
      where: { idPower_Supply: req.params.id },
      raw: true,
    });
    console.log(power_supply);
    return res.render("pages/buy.ejs", {
      supplierId: req.query.supplierId,
      isPower: true,
      data: power_supply,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  } else if (req.query && req.query.id && req.query.id == "storage") {
    const storage = await db.storage.findOne({
      where: { idStorage: req.params.id },
      raw: true,
    });
    console.log(storage);
    return res.render("pages/buy.ejs", {
      supplierId: req.query.supplierId,
      isStorage: true,
      data: storage,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  } else if (req.query && req.query.id && req.query.id == "peripheral") {
    const peripheral = await db.peripheral.findOne({
      where: { idPeripheral: req.params.id },
      raw: true,
    });
    console.log(peripheral);
    return res.render("pages/buy.ejs", {
      supplierId: req.query.supplierId,
      isPeripheral: true,
      data: peripheral,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  } else {
    const data = await db.peripheral.findOne({
      where: { idPeripheral: req.params.id },
      raw: true,
    });
    return res.render("pages/buy.ejs", {
      supplierId: req.query.supplierId,
      data,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  }
};

exports.delete = async function (req, res) {
  const supplier = await db.supplier.destroy({
    where: { idSupplier: req.params.id },
  });
  return res.redirect("/supplier");
  console.log("??????????????????????");
};
