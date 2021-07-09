const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
require ('dotenv').config();

//import routes
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const categoryRoutes = require('./routes/category.routes')
const productRoutes = require('./routes/product.routes')

//app
const app = express()


//DB
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("DB Connected"))


//middlewares
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

//routes middleware
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})