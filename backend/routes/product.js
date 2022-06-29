const express= require('express');
const router=express.Router();
const Product=require('../models/product');
const checkAuth=require('../middleware/chech-auth')

const productControllers=require('../controllers/product')

router.get('/',productControllers.getProducts)

router.get('/:id',productControllers.getProduct)

router.post('/',checkAuth,productControllers.addProduct)

router.put("/:id",checkAuth,productControllers.updateProduct);

router.delete("/:id", checkAuth,productControllers.deleteProduct);

module.exports=router;
