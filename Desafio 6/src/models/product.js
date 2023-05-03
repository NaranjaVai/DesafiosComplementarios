const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = mongoose.Schema({
    title:       {type: String, required: true},
    description: {type: String, required: true},    
    price:       {type: Number, required: true},
    stock:       {type: Number, required: true},
    category:    {type: String, required: true},
    thumbnail:   {type: String, required: true},
});
productSchema.plugin(mongoosePaginate)

module.exports = productSchema;