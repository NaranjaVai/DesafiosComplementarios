const {getCartById, createCarts, addProductToCart, productInCartService,deleteProduct } = require("../services/cartService.js");


const getCart = async (req, res) => {
    let cart = await getCarts()
    res.send(cart)
};

const createCart = async (req, res) => {
    let AddCart = await createCarts()
    res.send(AddCart)
};

const productInCart = async (req, res) => {
    let proInCart = await productInCartService(req.params.cid)
    console.log(proInCart)
    res.render('cartHome', { title: "Cart", proInCart })
};

const addProductCart = async (req, res) => {
    let addProduct = await addProductToCart(req.params.cid, req.params.pid)
    res.send({status: 'success', payload: 'added successfully'  },addProduct)
};

const deleteProductCart = async (req,res) => {
    const aux = await deleteProduct(req.params.cid, req.params.pid)
    res.send(aux)
}

module.exports = { getCart, createCart, addProductCart, productInCart ,deleteProductCart};