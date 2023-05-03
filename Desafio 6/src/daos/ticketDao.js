const ticket = require('../models/ticket')
const mongoose = require("mongoose");
const MONGODB = process.env.MONGODB_URL;
mongoose.connect(MONGODB, error => {
    if (error) {
        console.log('Cannot connect to db')
        process.exit()
    }
});


class TicketDAO {   
    async createTicket(tic) {
        const NewTicket = await ticket.create(tic);
        return NewTicket;
    }
  
}

module.exports = TicketDAO;