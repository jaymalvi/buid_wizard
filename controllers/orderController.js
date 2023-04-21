const { response } = require("express");
const db = require("../db/index");
const order = require("../db/models/order");

exports.findAll = async function (req, res) {
  let order = await db.order.findAll({
    include: [
      {
        model: db.user,
        as: "user",
      },
      {
        model: db.payment,
        as: "payment",
      },
      {
        model: db.delivery,
        as: "delivery",
      },
      {
        model: db.offer,
        as: "offer",
      },
    ],
    // raw: true,
  });
  order = order.map((i) => i.toJSON())
  console.log(order);
  return res.render("pages/customerOrder.ejs", {
    order,
    userData: req.session && req.session.user ? req.session.user : null,
  });
};

exports.create = async function (req, res) {
  console.log(req.body);
  try {
    const offer = await db.offer.create(req.body);
    // return res.json({offer: offer})
    return res.redirect("/offer");
  } catch (e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
};

exports.update = async function (req, res) {
  console.log(req.body);
  try {
    const offer = await db.offer.update(req.body, {
      where: {
        idOffers: req.body.idOffers,
      },
    });
    return res.redirect("/offer");
  } catch (e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
};

exports.findOne = async function (req, res) {
  const offer = await db.offer.findOne({
    where: { idOffers: req.params.id },
    raw: true,
  });
  console.log(offer);
  return res.render("pages/addOffer.ejs", {
    offer,
    userData: req.session && req.session.user ? req.session.user : null,
  });
};

exports.delete = async function (req, res) {
  const offer = await db.offer.destroy({ where: { idOffers: req.params.id } });
  return res.redirect("/offer");
  console.log("??????????????????????");
};
