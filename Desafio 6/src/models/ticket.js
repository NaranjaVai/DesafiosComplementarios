const mongoose = require("mongoose");
const ticketSchema = mongoose.Schema({
    code:{type: String},
    purchaseDateTime: {type: Date},
    amount: {type: Number},
    buyer:{type: String},
})

const ticket = mongoose.model('ticket', ticketSchema)
module.exports = ticket;