const TicketRepository = require('../repository/ticketRepository')
const ticketRepository = new TicketRepository();

const serviceTicket = async (ticket) =>{
    return await ticketRepository.createTicket(ticket)
}

module.exports = {serviceTicket};