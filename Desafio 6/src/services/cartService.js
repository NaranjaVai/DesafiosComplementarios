const CartRepository = require('../repository/cartRepository')
const cart = new CartRepository();

const getCarts = async (id) => {
    let aux = await cart.getCartRepository()
    return aux
}

const createCarts = async (cart) => {
    let aux = await cart.createCartRepository(cart)
    return aux
}

const addProductToCart = async (id, productId) => {
    let aux = await cart.addProductRepository(id, productId)
    return aux
}

const productInCartService = async (id) => {
    let aux = await cart.getProductsInCartRepository(id)
    return aux
}

const deleteProduct = async (cid, pid) =>{
    let aux = await cart.deleteProductRepository(cid,pid);
    return aux
}


module.exports = { getCarts, createCarts, addProductToCart, productInCartService,deleteProduct };  