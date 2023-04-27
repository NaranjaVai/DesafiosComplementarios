
const cartSchema = require("../models/cart");
const cartDAO = new CartsMongoDb('carts', cartSchema)

const getCarts = async () => {
    let aux = await cartDAO.getCarts()
    return aux
}

const createCarts = async (cart) => {
    let aux = await cartDAO.createCart(cart)
    return aux
}

const addProductToCart = async (id, productId) => {
    let aux = await cartDAO.addProductCart(id, productId)
    return aux
}

const productIn = async (pId) => {
    let aux = await cartDAO.getProductsInCart(pId)
    return aux
}


module.exports = { getCarts, createCarts, addProductToCart, productIn };  