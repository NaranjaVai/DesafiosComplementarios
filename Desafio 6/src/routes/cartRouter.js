const { Router } = require("express");
const { getCart, createCart, addProductCart, productInCart ,deleteProductCart } = require("../controllers/cartController.js");
//const purchaseProductsTicket = require('../controllers/tikectsControllers.js')
const {userValidation, logValidation} = require('../midlewares/index.js')
const cartsRouter = Router();
cartsRouter.get('/', userValidation, getCart);
cartsRouter.post('/', createCart);
cartsRouter.post('/:cid/product/:pid', userValidation, addProductCart);
cartRouter.delete('/:cid/product/:pid', logValidation, userValidation,  deleteProductCart)
cartsRouter.get('/:cid', userValidation, productInCart);
//cartsRouter.get('/:cid/purchase' , purchaseProductsTicket)
module.exports = cartsRouter;