const mongoose = require('mongoose');
const{ObjectId}=mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        minimum : 6,
        maxLength : 32
    },
    description: {
        type : String,
        required: true,
        maxLength : 2000
    },
    price: {
        type : Number,
        required: true,
        maxLength : 32
    },
    category: {
        type : ObjectId,
        ref: 'Category',
        required : true
    },
    quantity :{
        type : Number
    },
    photo:{
        data: Buffer,
        contentType:String
    },
    shipping:{
        required :false,
        type : Boolean
    }
    
  },
     {timestamps: true }
);


module.exports = mongoose.model("Prdouct", productSchema);