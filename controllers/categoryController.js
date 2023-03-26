const { response } = require('express');
const db = require('../db/index');
const category = require('../db/models/category');

exports.findAll = async function(req, res) {
  const category= await await db.category.findAll({raw :true});
  return res.render('pages/category.ejs', { category });
};

exports.create = async function(req, res) {
  console.log(req.body);
  try {
    const category = await db.category.create(req.body);
    // return res.json({category: category})
    return res.redirect('/category');
  }
  catch(e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }

  var page = req.params.page;
  var limit = 10; // number of records per page
  var offset = (page - 1) * limit;
  // retrieve data from the database using limit and offset
  var users = db.category(limit, offset);
  // count the total number of records in the database
  var count = db.count(category);
  // calculate the total number of pages
  var totalPages = Math.ceil(count / limit);
  // render the EJS template and pass the data as variables
  res.redirect('/category', { users: users, totalPages: totalPages, currentPage: page });

  
};



exports.update = async function(req,res){
  console.log(req.body);
  try {
    const category = await db.category.update(req.body,{
      where: {
        id: req.body.id
      }
    });
    return res.redirect('/category');
  }
  catch(e) {
    console.log(">>>>>>>>>>>>>>>>>>>>>..", e);
  }
}

// exports.findAll = async function(req, res) {
//   await db.categoryfindAll(req.params.id, function(err, category) {
// if (err)
// res.send(err);
// res.json(category);
// });
// };

exports.findOne = async function(req, res) {
   const category = await db.category.findOne({where:{id:req.params.id}, raw:true });
   console.log(category);
   return res.render('pages/addCategory.ejs', { category });
};
// exports.update = async function(req, res) {
//   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//     res.status(400).send({ error:true, message: 'Please provide all required field' });
//   }else{
//     await db.categoryupdate(req.params.id, new Category(req.body), function(err, category) {
//    if (err)
//    res.send(err);
//    res.json({ error:false, message: 'Category successfully updated' });
// });
// }
// };
exports.delete = async function(req, res) {
  const category =  await db.category.destroy( {where:{id:req.params.id}});
  return res.redirect('/category');
  console.log("??????????????????????")
};