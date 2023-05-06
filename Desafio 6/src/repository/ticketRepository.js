const TicketDao = require('../daos/ticketDao')
const ticketDAO = new TicketDao();

class TicketRepository{
    createTicket = (ticket) =>{
        return ticketDAO.createTicket(ticket)
    }
}
module.exports = TicketRepository