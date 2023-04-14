const { response } = require("express");
const db = require("../db/index");
const cabinet = require("../db/models/cabinet");

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

// Display All cabinet Record
exports.findAll = async function (req, res) {
  console.log("++++++++++", req.query);
  if (req.query && req.query.id && req.query.id == "cabinet") {
    const cabinet = await db.cabinet.findAll({ raw: true, where: { supplierId: req.session.user.idSupplier } });
    return res.render("pages/supllier/cabinet.ejs", { cabinet , userData: req.session && req.session.user ? req.session.user : null });
  }
  else if (req.query && req.query.id && req.query.id == "motherboard") {
    const motherboard = await db.motherboard.findAll({ raw: true, where: { supplierId: req.session.user.idSupplier } });
    return res.render("pages/supllier/motherboard.ejs", { motherboard , userData: req.session && req.session.user ? req.session.user : null });
  }
  else if (req.query && req.query.id && req.query.id == "cpu") {
    const cpu = await db.cpu.findAll({ raw: true, where: { supplierId: req.session.user.idSupplier } });
    return res.render("pages/supllier/cpu.ejs", { cpu , userData: req.session && req.session.user ? req.session.user : null });
  }
  else if (req.query && req.query.id && req.query.id == "ram") {
    const ram = await db.ram.findAll({ raw: true, where: { supplierId: req.session.user.idSupplier } });
    return res.render("pages/supllier/ram.ejs", { ram , userData: req.session && req.session.user ? req.session.user : null  });
  } 
  else if (req.query && req.query.id && req.query.id == "colling") {
    const cooling_system = await db.cooling_system.findAll({ raw: true, where: { supplierId: req.session.user.idSupplier } });
    return res.render("pages/supllier/coollingSystem.ejs", { cooling_system , userData: req.session && req.session.user ? req.session.user : null  });
  }
  else if (req.query && req.query.id && req.query.id == "graphiccard") {
    const graphic_card = await db.graphic_card.findAll({ raw: true, where: { supplierId: req.session.user.idSupplier } });
    return res.render("pages/supllier/graphicCard.ejs", { graphic_card , userData: req.session && req.session.user ? req.session.user : null  });
  }
  else if (req.query && req.query.id && req.query.id == "powersupply") {
    const power_supply = await db.power_supply.findAll({ raw: true, where: { supplierId: req.session.user.idSupplier } });
    return res.render("pages/supllier/powerSupply.ejs", { power_supply , userData: req.session && req.session.user ? req.session.user : null  });
  }
  else if (req.query && req.query.id && req.query.id == "storage") {
    const storage = await db.storage.findAll({ raw: true, where: { supplierId: req.session.user.idSupplier } });
    return res.render("pages/supllier/storage.ejs", { storage , userData: req.session && req.session.user ? req.session.user : null  });
  }
  else if (req.query && req.query.id && req.query.id == "peripheral") {
    const peripheral = await db.peripheral.findAll({ raw: true, where: { supplierId: req.session.user.idSupplier } });
    return res.render("pages/supllier/peripheral.ejs", { peripheral , userData: req.session && req.session.user ? req.session.user : null  });
  }
};

// Display All motherboard Record
// exports.findAll = async function(req, res) {
//   const motherboard= await await db.motherboard.findAll({raw :true});
//   console.log("++++++++++",motherboard);
//   return res.render('pages/supllier/motherboard.ejs', { motherboard });
// };

exports.create = async function (req, res) {
  console.log(">>>>>>>>>>>>++++++++++++++>", req.body, req.file, req.files);

  try {
    if (req.body.item == "cabinet") {
      // upload.single('cabinet_ImageURL')(req, res, (err) => {
      //   if (err) {
      //     // return res.status(400).send({ message: 'Error uploading file' });
      //   }
      //   // return res.status(200).send({ message: 'File uploaded successfully' });
      // });
      req.body.cabinet_ImageURL =
        req.file && req.file.originalname ? req.file.originalname : "";
      const cabinet = await db.cabinet.create(req.body);
      // return res.json({cabinet: cabinet})
      return res.redirect("/cabinet?id=cabinet");
    } else if (req.body.item == "motherboard") {
      req.body.image_url =
        req.file && req.file.originalname ? req.file.originalname : "";
      const motherboard = await db.motherboard.create(req.body);
      return res.redirect("/cabinet?id=motherboard");
    } else if (req.body.item == "cpu") {
      req.body.image_URL =
        req.file && req.file.originalname ? req.file.originalname : "";
      const cpu = await db.cpu.create(req.body);
      return res.redirect("/cabinet?id=cpu");
    } else if (req.body.item == "ram") {
      req.body.Image_Url =
        req.file && req.file.originalname ? req.file.originalname : "";
      const ram = await db.ram.create(req.body);
      return res.redirect("/cabinet?id=ram");
    } else if (req.body.item == "colling") {
      req.body.ImageURL =
        req.file && req.file.originalname ? req.file.originalname : "";
      const cooling_system = await db.cooling_system.create(req.body);
      return res.redirect("/cabinet?id=colling");
    } else if (req.body.item == "graphiccard") {
      req.body.ImageURL =
        req.file && req.file.originalname ? req.file.originalname : "";
      const graphic_card = await db.graphic_card.create(req.body);
      return res.redirect("/cabinet?id=graphiccard");
    } else if (req.body.item == "powersupply") {
      req.body.Image_Url =
        req.file && req.file.originalname ? req.file.originalname : "";
      const power_supply = await db.power_supply.create(req.body);
      return res.redirect("/cabinet?id=powersupply");
    } else if (req.body.item == "storage") {
      req.body.Image_Url =
        req.file && req.file.originalname ? req.file.originalname : "";
      const storage = await db.storage.create(req.body);
      return res.redirect("/cabinet?id=storage");
    } else if (req.body.item == "peripheral") {
      req.body.image_url =
        req.file && req.file.originalname ? req.file.originalname : "";
      const peripheral = await db.peripheral.create(req.body);
      return res.redirect("/cabinet?id=peripheral");
    }
  } catch (e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
};

exports.update = async function (req, res) {
  // console.log(req.body, req.file);
  req.body.cabinet_ImageURL =
    req.file && req.file.originalname ? req.file.originalname : "";
  try {
    if (req.body.item == "cabinet") {
      const cabinet = await db.cabinet.update(req.body, {
        where: {
          idCabinet: req.body.idCabinet,
        },
      });
      return res.redirect("/cabinet?id=cabinet");
    } else if (req.body.item == "motherboard") {
      const motherboard = await db.motherboard.update(req.body, {
        where: {
          idMotherboard: req.body.idMotherboard,
        },
      });
      return res.redirect("/cabinet?id=motherboard");
    } else if (req.body.item == "cpu") {
      const cpu = await db.cpu.update(req.body, {
        where: {
          idCpu: req.body.idCpu,
        },
      });
      return res.redirect("/cabinet?id=cpu");
    } else if (req.body.item == "ram") {
      const ram = await db.ram.update(req.body, {
        where: {
          idRam: req.body.idRam,
        },
      });
      return res.redirect("/cabinet?id=ram");
    } else if (req.body.item == "colling") {
      const cooling_system = await db.cooling_system.update(req.body, {
        where: {
          idCooling_System: req.body.idCooling_System,
        },
      });
      return res.redirect("/cabinet?id=colling");
    } else if (req.body.item == "graphiccard") {
      const graphic_card = await db.graphic_card.update(req.body, {
        where: {
          idGraphic_Card: req.body.idgraphic,
        },
      });
      return res.redirect("/cabinet?id=graphiccard");
    }
    else if (req.body.item == "powersupply") {
      const power_supply = await db.power_supply.update(req.body, {
        where: {
          idPower_Supply: req.body.idpower,
        },
      });
      return res.redirect("/cabinet?id=powersupply");
    }
    else if (req.body.item == "storage") {
      const storage = await db.storage.update(req.body, {
        where: {
          idStorage: req.body.idstorage,
        },
      });
      return res.redirect("/cabinet?id=storage");
    }
    else if (req.body.item == "peripheral") {
      const peripheral = await db.peripheral.update(req.body, {
        where: {
          idPeripheral: req.body.idperipheral,
        },
      });
      return res.redirect("/cabinet?id=peripheral");
    }
  } catch (e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
};

exports.findOne = async function (req, res) {
  console.log(">>>>>>>.>>>>>>>>>>>>>>>????????/", req.query);
  if (req.query && req.query.id && req.query.id == "cabinet") {
    const data = await db.cabinet.findOne({
      where: { idCabinet: req.params.id },
      raw: true,
    });
    console.log(data);
    return res.render("pages/supllier/addItems.ejs", { data ,  });
  } else if (req.query && req.query.id && req.query.id == "motherboard") {
    const data = await db.motherboard.findOne({
      where: { idMotherboard: req.params.id },
      raw: true,
    });
    console.log(data);
    return res.render("pages/supllier/addItems.ejs", { data , userData: req.session && req.session.user ? req.session.user : null  });
  } else if (req.query && req.query.id && req.query.id == "cpu") {
    const data = await db.cpu.findOne({
      where: { idCpu: req.params.id },
      raw: true,
    });
    console.log(data);
    return res.render("pages/supllier/addItems.ejs", { data , userData: req.session && req.session.user ? req.session.user : null  });
  } else if (req.query && req.query.id && req.query.id == "ram") {
    const data = await db.ram.findOne({
      where: { idRam: req.params.id },
      raw: true,
    });
    console.log(data);
    return res.render("pages/supllier/addItems.ejs", { data , userData: req.session && req.session.user ? req.session.user : null  });
  } else if (req.query && req.query.id && req.query.id == "colling") {
    const data = await db.cooling_system.findOne({
      where: { idCooling_System: req.params.id },
      raw: true,
    });
    console.log(data);
    return res.render("pages/supllier/addItems.ejs", { data , userData: req.session && req.session.user ? req.session.user : null  });
  } else if (req.query && req.query.id && req.query.id == "graphiccard") {
    const data = await db.graphic_card.findOne({
      where: { idGraphic_Card: req.params.id },
      raw: true,
    });
    console.log(data);
    return res.render("pages/supllier/addItems.ejs", { data , userData: req.session && req.session.user ? req.session.user : null  });
  } else if (req.query && req.query.id && req.query.id == "powersupply") {
    const data = await db.power_supply.findOne({
      where: { idPower_Supply: req.params.id },
      raw: true,
    });
    console.log(data);
    return res.render("pages/supllier/addItems.ejs", { data , userData: req.session && req.session.user ? req.session.user : null  });
  } else if (req.query && req.query.id && req.query.id == "storage") {
    const data = await db.storage.findOne({
      where: { idStorage: req.params.id },
      raw: true,
    });
    console.log(data);
    return res.render("pages/supllier/addItems.ejs", { data , userData: req.session && req.session.user ? req.session.user : null  });
  } else if (req.query && req.query.id && req.query.id == "peripheral") {
    const data = await db.peripheral.findOne({
      where: { idPeripheral: req.params.id },
      raw: true,
    });
    console.log(data);
    return res.render("pages/supllier/addItems.ejs", { data , userData: req.session && req.session.user ? req.session.user : null });
  }
};

exports.delete = async function (req, res) {
  if (req.query && req.query.id && req.query.id == "cabinet") {
    const cabinet = await db.cabinet.destroy({
      where: { idCabinet: req.params.id },
    });
    return res.redirect("/cabinet?id=cabinet");
    console.log("??????????????????????");
  } else if (req.query && req.query.id && req.query.id == "motherboard") {
    const motherboard = await db.motherboard.destroy({
      where: { idMotherboard: req.params.id },
    });
    return res.redirect("/cabinet?id=motherboard");
    console.log("??????????????????????");
  } else if (req.query && req.query.id && req.query.id == "cpu") {
    const cpu = await db.cpu.destroy({ where: { idCpu: req.params.id } });
    return res.redirect("/cabinet?id=cpu");
    console.log("??????????????????????");
  } else if (req.query && req.query.id && req.query.id == "ram") {
    const ram = await db.ram.destroy({ where: { idRam: req.params.id } });
    return res.redirect("/cabinet?id=ram");
    console.log("??????????????????????");
  } else if (req.query && req.query.id && req.query.id == "colling") {
    const cooling_system = await db.cooling_system.destroy({
      where: { idCooling_System: req.params.id },
    });
    return res.redirect("/cabinet?id=colling");
    console.log("??????????????????????");
  } else if (req.query && req.query.id && req.query.id == "graphiccard") {
    const graphic_card = await db.graphic_card.destroy({
      where: { idGraphic_Card: req.params.id },
    });
    return res.redirect("/cabinet?id=graphiccard");
    console.log("??????????????????????");
  } else if (req.query && req.query.id && req.query.id == "powersupply") {
    const power_supply = await db.power_supply.destroy({
      where: { idPower_Supply: req.params.id },
    });
    return res.redirect("/cabinet?id=powersupply");
    console.log("??????????????????????");
  } else if (req.query && req.query.id && req.query.id == "storage") {
    const storage = await db.storage.destroy({
      where: { idStorage: req.params.id },
    });
    return res.redirect("/cabinet?id=storage");
    console.log("??????????????????????");
  } else if (req.query && req.query.id && req.query.id == "peripheral") {
    const peripheral = await db.peripheral.destroy({
      where: { idPeripheral: req.params.id },
    });
    return res.redirect("/cabinet?id=peripheral");
    console.log("??????????????????????");
  }
};
