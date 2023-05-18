const { Router } = require("express");
const { getCart, createCart, addProductCart, productInCart ,deleteProductCart } = require("../controllers/cartController.js");
const purchaseTicket = require('../controllers/ticketController.js')
const {userValidation, logValidation} = require('../middlewares/index.js')
const cartsRouter = Router();


cartsRouter.get('/', userValidation, getCart);
cartsRouter.post('/', createCart);
cartsRouter.post('/:cid/product/:pid', userValidation, addProductCart);
cartsRouter.delete('/:cid/product/:pid', logValidation, userValidation,  deleteProductCart)
cartsRouter.get('/:cid', userValidation, productInCart);
cartsRouter.get('/:cid/purchase' , purchaseTicket)

module.exports = cartsRouter;