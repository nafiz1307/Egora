const express = require('express');
const mongoose = require('mongoose')
require ('dotenv').config();

//import routes
const userRoutes = require('./routes/user.routes')

//app
const app = express()


//DB
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("DB Connected"))

//routes middleware
app.use("/api",userRoutes)

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})