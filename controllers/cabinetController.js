const { response } = require('express');
const db = require('../db/index');
const cabinet = require('../db/models/cabinet');

// Display All cabinet Record
exports.findAll = async function(req, res) {
  console.log("++++++++++", req.query); 
  if (req.query && req.query.id && req.query.id == "cabinet") {
    const cabinet = await db.cabinet.findAll({raw :true});
    return res.render('pages/supllier/cabinet.ejs', { cabinet });
  } else if (req.query && req.query.id && req.query.id == "motherboard") {
    const motherboard = await db.motherboard.findAll({raw :true});
    return res.render('pages/supllier/motherboard.ejs', { motherboard });
  } else if (req.query && req.query.id && req.query.id == "cpu") {
    const cpu = await db.cpu.findAll({raw :true});
    return res.render('pages/supllier/cpu.ejs', { cpu });
  }
};

// Display All motherboard Record
// exports.findAll = async function(req, res) {
//   const motherboard= await await db.motherboard.findAll({raw :true});
//   console.log("++++++++++",motherboard); 
//   return res.render('pages/supllier/motherboard.ejs', { motherboard });
// };

exports.create = async function(req, res) {
  console.log(">>>>>>>>>>>>>",req.body);
  try {
    if (req.body.item=="cabinet"){
      const cabinet = await db.cabinet.create(req.body);
      // return res.json({cabinet: cabinet})
      return res.redirect('/cabinet?id=cabinet');
    }
    else if(req.body.item=="motherboard"){
      const motherboard = await db.motherboard.create(req.body);
      return res.redirect('/cabinet?id=motherboard');
    }
    else if(req.body.item=="cpu"){
      const cpu = await db.cpu.create(req.body);
      return res.redirect('/cabinet?id=cpu');
    }
  }
  catch(e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }

  

  
};



exports.update = async function(req,res){
  console.log(req.body);
  try {
     if (req.body.item=="cabinet"){
      const cabinet = await db.cabinet.update(req.body,{
        where: {
          idCabinet: req.body.idCabinet
        }
      });
      return res.redirect('/cabinet?id=cabinet');
    }
    else if(req.body.item=="motherboard"){
      const motherboard = await db.motherboard.update(req.body,{
        where: {
          idMotherboard: req.body.idMotherboard
        }
      });
      return res.redirect('/cabinet?id=motherboard');
    }
  }
  catch(e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
}



exports.findOne = async function(req, res) {
  console.log(">>>>>>>.>>>>>>>>>>>>>>>????????/", req.query);
  if (req.query && req.query.id && req.query.id == "cabinet") {
    const data = await db.cabinet.findOne({where:{idCabinet:req.params.id}, raw:true });
    console.log(data);
    return res.render('pages/supllier/addItems.ejs', { data });
  } else if (req.query && req.query.id && req.query.id == "motherboard") {
    const data = await db.motherboard.findOne({where:{idMotherboard:req.params.id}, raw:true });
    console.log(data);
    return res.render('pages/supllier/addItems.ejs', { data });
  }
};

exports.delete = async function(req, res) {
  if (req.query && req.query.id && req.query.id == "cabinet") {
    const cabinet =  await db.cabinet.destroy( {where:{idCabinet:req.params.id}});
    return res.redirect('/cabinet?id=cabinet');
    console.log("??????????????????????")
    
  } else if (req.query && req.query.id && req.query.id == "motherboard") {
    const motherboard =  await db.motherboard.destroy( {where:{idMotherboard:req.params.id}});
    return res.redirect('/cabinet?id=motherboard');
    console.log("??????????????????????")
  }
  

};