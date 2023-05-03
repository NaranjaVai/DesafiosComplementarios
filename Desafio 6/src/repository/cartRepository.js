const CartDao = require('../daos/cartDao');
const cart = new CartDao();

class CartRepository {

    createCartRepository = async () => {
        const aux = await cart.createCart();
        return aux;
    };

    getCartByRepository = async (id) => {
        const aux = await cart.getCart();
        return aux;
    };

    getProductsInCartRepository = async (id) => {
        const aux = await cart.getProductsInCart(id);
        return aux;
    }
    addProductRepository = async (cid,pid) =>{
        const aux = await cart.addProductCart(cid,pid);
        return aux;
    }
    deleteProductRepository = async(cid, pid) =>{
        const aux = await cart.removeProductCart(cid, pid);
        return aux;
    }
}

module.exports = CartRepository