class TicketDto {
    constructor(code, purchaseDateTime, amount, buyer) {
        this.code = code;
        this.purchaseDateTime = purchaseDateTime;
        this.amount = amount;
        this.buyer = buyer;
    }
}
module.exports = TicketDto;