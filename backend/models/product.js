const mongoose=require('mongoose');
const user = require('./user');

const productSchema= new mongoose.Schema({
  productName: {
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true

  },
  date:{
    type:String,
    required:true
  },
  freshness:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  comment:{
    type:String,
    required:true
  },
  creator:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
})

module.exports=mongoose.model('Product',productSchema)
