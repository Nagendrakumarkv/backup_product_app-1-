const mongoose=require('mongoose')
const uniqueValidator=require("mongoose-unique-validator")

const userSchema=new mongoose.Schema({
  firstName: {
   type:String,
   required:false
  },
  lastName:{
    type:String,
    required:false
  },
  date: {
    type:String,
   required:false
  },
  email: {
    type:String,
    required:false,
    unique:true
  },
  password: {
    type:String,
    required:true
  },
  confirmPassword: {
    type:String,
    required:false
  }
})
userSchema.plugin(uniqueValidator);

module.exports= mongoose.model('User',userSchema)
