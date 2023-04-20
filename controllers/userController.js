const { response } = require('express');
const db = require('../db/index');
const user = require('../db/models/user');

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

exports.findAll = async function(req, res) {
  const user= await await db.user.findAll({raw :true});
  console.log(user); 
  return res.render('pages/user.ejs', { user , userData: req.session && req.session.user ? req.session.user : null });

};

exports.create = async function(req, res) {
  console.log(req.body, req.file, req.files.userImageURL);
  req.body.userImageURL = req.files && req.files.userImageURL && req.files.userImageURL[0] && req.files.userImageURL[0].originalname ? req.files.userImageURL[0].originalname : "";
  req.body.aadharCardImageURL = req.files && req.files.aadharCardImageURL && req.files.aadharCardImageURL[0] && req.files.aadharCardImageURL[0].originalname ? req.files.aadharCardImageURL[0].originalname : "";
  try {
    const user = await db.user.create(req.body);
    return res.redirect('/user');
  }
  catch(e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }

  

  
};



exports.update = async function(req,res){
  console.log(req.body);
  req.body.userImageURL = req.files && req.files.userImageURL && req.files.userImageURL[0] && req.files.userImageURL[0].originalname ? req.files.userImageURL[0].originalname : "";
  req.body.aadharCardImageURL = req.files && req.files.aadharCardImageURL && req.files.aadharCardImageURL[0] && req.files.aadharCardImageURL[0].originalname ? req.files.aadharCardImageURL[0].originalname : "";
  try {
    const user = await db.user.update(req.body,{
      where: {
        idUser: req.body.idUser
      }
    });
    return res.redirect('/user');
  }
  catch(e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
}



exports.findOne = async function(req, res) {
   const user = await db.user.findOne({where:{idUser:req.params.id}, raw:true });
   console.log(user);
   return res.render('pages/addUser.ejs', { user , userData: req.session && req.session.user ? req.session.user : null  });
};

exports.delete = async function(req, res) {
  const user =  await db.user.destroy( {where:{idUser:req.params.id}});
  return res.redirect('/user');
  console.log("??????????????????????")
};