const express =require( 'express');
const Category =require( '../models/Category');
const asyncHandler =require( 'express-async-handler');
// const { protectRoute, admin } =require( '../middleware/authMiddleware.js');

const categoryRoutes = express.Router();

const getCategorys = async (req, res) => {
  const categorys = await Category.find({});
  res.json(categorys);
};



//create a product
const createNewCategory = asyncHandler(async (req, res) => {
  const {name, image } = req.body;

  const newCategory = await Category.create({
    name,
    image: '/images/' + image
  });
  await newCategory.save();

  const Categorys = await Category.find({});

  if (newCategory) {
    res.json(Categorys);
  } else {
    res.status(404).send('Category could not be uploaded.');
  }
});
// delete a product




categoryRoutes.route('/').get(getCategorys);
categoryRoutes.route('/').post(
  // protectRoute, admin, 
  createNewCategory);

  module.exports =categoryRoutes;
