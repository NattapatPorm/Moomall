const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const connectPortDebugger = require('debug')('app:mode');
const dbConnectDebugger = require('debug')('app:db');

const database_url = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:27017/moomall?authSource=admin`;

mongoose.connect(database_url,{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=>dbConnectDebugger('Connect MongoDB Success...'))
    .catch(err=>console.error(err))

const port = process.env.PORT || 3001;

const productRouters = require('./routes/productRouters');
const orderRouters = require('./routes/orderRouter');

app.use(cors({
    origin:"*",
    optionsSuccessStatus:200,
    methods:['POST','GET','PUT','DELETE']
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

if(process.env.NODE_ENV==="development"){
    app.use(morgan('tiny'));
}

app.use('/api/products',productRouters);
app.use('/api/orders',orderRouters);


app.get('/',(req,res)=>{
    res.send({message:"Success"});
});

app.listen(port,()=>{
    connectPortDebugger(`Connect To Port ${port} on ${process.env.NODE_ENV} mode...`);
});