const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema({
    productid : {
        type : Number,
        required : true
    },
    groceryname : {
        type : String,
        required : true
    },
    price : {
        type: String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('Grocery', GrocerySchema);