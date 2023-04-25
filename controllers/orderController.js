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
      {
        model: db.order_has_products,
        as: "order_has_products",
        include: [
          {
            model: db.product,
            as: "product",
          },
        ],
      },
    ],
    // raw: true,
  });
  order = order.map((i) => i.toJSON());
  console.log(JSON.stringify(order));
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
  const users = await db.user.findAll({ raw: true, where: { role : 'Delivery Person' } });
  console.log("users >>>>>>>>>>>. ", users);
  const order = await db.order.findOne({
    include: [
      {
        model: db.user,
        as: "user"
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
      {
        model: db.order_has_products,
        as: "order_has_products",
        include: [
          {
            model: db.product,
            as: "product",
            include: [
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
                as: "storage"
              },
            ],
          },
        ],
      },
    ],
    where: { idOrder: req.params.id },
    raw: true,
  });
  console.log(order);
  return res.render("pages/orderDetails.ejs", {
    order,
    userData: req.session && req.session.user ? req.session.user : null,
    users
  });
};

exports.delete = async function (req, res) {
  const offer = await db.offer.destroy({ where: { idOffers: req.params.id } });
  return res.redirect("/offer");
  console.log("??????????????????????");
};
