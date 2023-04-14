const { response } = require('express');
const db = require('../db/index');
const supplier = require('../db/models/supplier');


exports.findAll = async function(req, res) {
  const supplier= await db.supplier.findAll({raw :true});
  console.log(supplier); 
  return res.render('pages/suppliers.ejs', { supplier , userData: req.session && req.session.user ? req.session.user : null });

};

exports.viewItem = async function(req, res) {
  console.log("++++", req.session.user, req.query.id, req.quary);
  const cabinet= await db.cabinet.findAll({raw :true, where: { supplierId: req.query.id }});
  console.log(cabinet);
  const motherboard= await db.motherboard.findAll({raw :true, where: { supplierId: req.query.id }});
  console.log(motherboard);
  const cpu= await db.cpu.findAll({raw :true, where: { supplierId: req.query.id }});
  console.log(cpu); 
  const ram= await db.ram.findAll({raw :true, where: { supplierId: req.query.id }});
  console.log(ram); 
  const cooling_system= await db.cooling_system.findAll({raw :true, where: { supplierId: req.query.id }});
  console.log(cooling_system); 
  const graphic_card= await db.graphic_card.findAll({raw :true, where: { supplierId: req.query.id }});
  console.log(graphic_card); 
  const power_supply= await db.power_supply.findAll({raw :true, where: { supplierId: req.query.id }});
  console.log(power_supply); 
  const storage= await db.storage.findAll({raw :true, where: { supplierId: req.query.id }});
  console.log(storage); 
  const peripheral= await db.peripheral.findAll({raw :true, where: { supplierId: req.query.id }});
  console.log(peripheral);   
  return res.render('pages/viewCabinet.ejs', { cabinet, motherboard, cpu, ram, cooling_system, graphic_card, power_supply, storage, peripheral, userData: req.session && req.session.user ? req.session.user : null });
  

};




exports.create = async function(req, res) {
  console.log(req.body);
  try {
    const supplier = await db.supplier.create(req.body);
    return res.redirect('/supplier');
  }
  catch(e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
};



exports.update = async function(req,res){
  console.log(req.body);
  try {
    const supplier = await db.supplier.update(req.body,{
      where: {
        idSupplier: req.body.idSupplier
      }
    });
    return res.redirect('/supplier');
  }
  catch(e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
}



exports.findOne = async function(req, res) {
   const supplier = await db.supplier.findOne({where:{idSupplier:req.query.id}, raw:true });
   console.log(supplier);
   return res.render('pages/addSupplier.ejs', { supplier , userData: req.session && req.session.user ? req.session.user : null });
};

exports.delete = async function(req, res) {
  const supplier =  await db.supplier.destroy( {where:{idSupplier:req.query.id}});
  return res.redirect('/supplier');
  console.log("??????????????????????")
};