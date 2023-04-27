const { getCarts, createCarts, addProductToCart, productIn } = require("../services/cartsService.js");


const getCart = async (req, res) => {
    let carts = await getCarts()
    console.log(carts)
    
    res.send(carts)
};

const createCart = async (req, res) => {
    let AddCart = await createCarts()
    res.send(AddCart)
};

const addProductCart = async (req, res) => {
    let addProduct = await addProductToCart(req.params.cid, req.params.pid)
    res.send(addProduct)
};

const productInCart = async (req, res) => {
    let proInCart = await productIn(req.params.cid)
    console.log(proInCart)
    res.render('cartHome', { title: "Carrito", proInCart })
};

module.exports = { getCart, createCart, addProductCart, productInCart };