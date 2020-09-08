const express = require('express');
const router = express.Router();
const Order = require('../model/orderSchema');


router.post('/',async(req,res)=>{
    const {name,color,size,quantity,image} = req.body;
    console.log('-------req.body-----');
    console.log(req.body);
    Order.create({
        name:name,
        color:color,
        size:size,
        quantity:parseInt(quantity),
        image:image
    },(err,data)=>{
        if(err) throw err;
        res.send({success:true,message:"Insert Order Success..."});
    });
    
});

router.get('/getOrder',async(req,res)=>{
    const result = await Order.find();
    res.send({success:true,message:"Count Order Success...",data:result});
});


router.get('/countOrder',async(req,res)=>{
    const result = await Order.find().count();
    res.send({success:true,message:"Count Order Success...",data:result});
});

module.exports = router;