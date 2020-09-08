const express = require('express');
const router = express.Router();
const Product = require('../model/productSchema');

router.get('/',async(req,res)=>{
    const result = await Product.find();
    res.send({success:true,message:"Get Product List Data Success...",data:result});
});

module.exports = router;