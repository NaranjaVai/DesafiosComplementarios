class ProductDto {
    constructor(_id, title, description, price, stock, category, thumbnail) {
        this._id = _id
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
    }
}
module.exports = ProductDto;
