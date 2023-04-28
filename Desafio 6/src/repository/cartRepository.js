const CartDao = require('../daos/cartDao');
const cart = new CartDao();

class CartRepository {

    createCartRepository = async () => {
        const aux = await cart.createCart();
        return aux;
    };

    getCartRepository = async (e) => {
        const aux = await cart.getCarts(e);
        return aux;
    };

    getProductsInCartRepository = async (email) => {
        const aux = await cart.getProductsInCart(email);
        return aux;
    }

}

module.exports = CartRepository