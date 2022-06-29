const product = require('../models/product');
const Product=require('../models/product');

exports.getProducts=async(req,res)=>{
  try{
    const product= await Product.find();
    res.json(product)
  }catch(error){
    res.status(500).json({
      error:error,
      message:"Fetching products failed!"
    })
  }
}

exports.getProduct=async(req,res)=>{
  try{
   const product=await Product.findById(req.params.id);
   res.json(product)
  }catch(err){
    res.send(500).json({
      error:err,
      message:"Fetching product failed!"
    });
  }
}

exports.addProduct=async(req,res)=>{
  const product=new Product({
    productName:req.body.productName,
    category:req.body.category,
    date:req.body.date,
    freshness:req.body.freshness,
    price:req.body.price,
    comment:req.body.comment,
    creator:req.userData.userId
  })
  try{
   const p1=await product.save();
   res.status(200).json({
    message:"product added successfully",
    result:p1
   });
  }catch(err){
    res.status(500).json({
      message:"Creating a product failed!"
    })
  }
}

exports.updateProduct=(req, res, next) => {
  const product = {
    _id: req.body.id,
    productName: req.body.productName,
    category: req.body.category,
    date: req.body.date,
    freshness: req.body.freshness,
    price: req.body.price,
    comment: req.body.comment,
    creator:req.userData.userId
  };

  Product.updateOne(
    { _id: req.params.id ,creator:req.userData.userId},
    product
  ).then(result => {
    if(result.modifiedCount>0){
      res.status(200).json({ message: "Update successful!",result:result });
    }
    else{
      res.status(401).json({message:"Not Authorized!"})
    }
  }).catch(error=>{
    res.status(500).json({
      error:error,
      message:"Couldn't udpate product"
    })
  });
}

exports.deleteProduct=(req, res, next) => {
  Product.deleteOne({ _id: req.params.id,creator:req.userData.userId }).then(
    result => {
      if(result.deletedCount>0){
      res.status(200).json({ message: "Deletion successful!" });
      }
      else{
        res.status(401).json({message:"Not authorized!"})
      }
    }
  ).catch(error=>{
    res.status(500).json({
      error:error,
      message:"Couldn't delete product!"
    })
  });
}
