const express =require( "express");
const Product =require( "../models/Product.js")
const productRoutes=express.Router()
const asyncHandler =require ('express-async-handler');
const getProducts =async(req,res)=>{
  const products = await Product.find({})
  res.json(products)
}

const getProduct=async(req,res)=>{
  const product= await Product.findById(req.params.id)
  if(product){
    res.json(product)
  }else{
    res.status(404).res('product not found.')
  }
}

const createNewProduct = asyncHandler(async (req, res) => {
  const { name, category, stock, price, image, productIsNew, description } = req.body;
  const newProduct = await Product.create({
    name,
    category,
    stock,
    price,
    image: '/images/' + image,
    productIsNew,
    description,
  });
  await newProduct.save();

  const products = await Product.find({});

  if (newProduct) {
    res.json(products);
  } else {
    res.status(404).res('Product could not be uploaded.');
  }
});


productRoutes.route('/').get(getProducts)
productRoutes.route('/:id').get(getProduct)
productRoutes.route('/').post(
  // protectRoute, admin, 
  createNewProduct);

  module.exports =productRoutes;