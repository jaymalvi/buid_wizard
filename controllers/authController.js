const { response } = require('express');
const db = require('../db/index');
const user = require('../db/models/user');

exports.findAll = async function(req, res) {
  const offer= await await db.offer.findAll({raw :true});
  console.log(offer); 
  console.log(userData);
  return res.render('pages/offer.ejs', { offer , userData: req.session && req.session.user ? req.session.user : null });

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



exports.login = async function(req, res) {

    if(req.body.role=="admin"){
        const user = await db.user.findOne({where:{email:req.body.email}, raw:true });
        console.log(user);
        return res.render('pages/dashboard.ejs', { user , userData: req.session && req.session.user ? req.session.user : null  });

    }

};

exports.delete = async function(req, res) {
  const offer =  await db.offer.destroy( {where:{idOffers:req.params.id}});
  return res.redirect('/offer');
  console.log("??????????????????????")
};