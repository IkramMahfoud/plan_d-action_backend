const mongoose =require('mongoose');
const express =require('express');
const expressValidator=require('express-validator')
const cookieparser =require('cookie-parser')
const bodyParser = require('body-parser');

//Config app
const app=express();
require('dotenv').config();
//Database
mongoose.connect(process.env.DATABASE)
        .then(()=>console.log("database connected...."))
        .catch(err =>console.error('db could not connect....'))

// Add this middleware to parse JSON requests
app.use(bodyParser.json());

//Import Routes
const userRouters=require('./route/user')
const categoryRouters=require('./route/categories')
const productRouters=require('./route/product')


//routes middleware
app.use(express.json())
app.use(expressValidator())
app.use(cookieparser())
app.use('/api',userRouters)
app.use('/api/category',categoryRouters)
app.use('/api/product',productRouters)


// auth
const authRoutes = require('./route/auth');
app.use('/auth', authRoutes);

const port =process.env.PORT ||3000
app.listen(port,()=>console.log(`the app listening the ${port} ..`));