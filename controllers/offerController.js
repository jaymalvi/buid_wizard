const { response } = require('express');
const db = require('../db/index');
const offer = require('../db/models/offer');

exports.findAll = async function(req, res) {
  const offer= await await db.offer.findAll({raw :true});
  console.log(offer); 
  return res.render('pages/offer.ejs', { offer});

};

exports.create = async function(req, res) {
  console.log(req.body);
  try {
    const offer = await db.offer.create(req.body);
    // return res.json({offer: offer})
    return res.redirect('/offer');
  }
  catch(e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }

  

  
};



exports.update = async function(req,res){
  console.log(req.body);
  try {
    const offer = await db.offer.update(req.body,{
      where: {
        idOffers: req.body.idOffers
      }
    });
    return res.redirect('/offer');
  }
  catch(e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
}



exports.findOne = async function(req, res) {
   const offer = await db.offer.findOne({where:{idOffers:req.params.id}, raw:true });
   console.log(offer);
   return res.render('pages/addOffer.ejs', { offer });
};

exports.delete = async function(req, res) {
  const offer =  await db.offer.destroy( {where:{idOffers:req.params.id}});
  return res.redirect('/offer');
  console.log("??????????????????????")
};