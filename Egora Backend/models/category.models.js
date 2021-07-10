const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        minimum : 6,
        maxLength : 32
    },
    
  },
     {timestamps: true }
);


module.exports = mongoose.model("Category", categorySchema);