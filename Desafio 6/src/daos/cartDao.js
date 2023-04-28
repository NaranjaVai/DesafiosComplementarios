const mongoose = require("mongoose");
const CartModel = require('../model/cart')
const CartDto = require('./DTO/cartDTO')

const MONGODB = process.env.MONGODB
mongoose.connect(MONGODB, error => {
    if (error) {
        console.log('Cannot connect to db')
        process.exit()
    }
});

const toDTO = (cart) => {
    const products = cart.products.map(p =>{
        return{
            _id: p.product._id,
            title: p.product.title,
            price: p.product.price,
            quantity: p.quantity
        }
    })
    let aux = new CartDto(products)
    return aux
}

class CartDao {

    async createCart() {
        try {
            let aux = await CartModel.create({})
            return aux
        } catch (err) {
            console.log(err)
        }
    }

    async getItemsInCart() {
        try {
            const cart = await CartModel.findOne({ _id: id })
            return cart.products
        }
        catch (err) {
            console.log(err)
        }
    }

    async getProductsInCart(cartId) {
        try{
            const existCart = await CartModel.findOne({ _id: cartId }).lean()
                    .populate("products.product")
            if(!existCart){
                return `no existe un carrito con el id: ${cartId}` }
            const aux = existCart.products
            return aux
            
        }catch (error) {
            console.log(error)
        }
    }

    async addProductCart(id, proId) {
        try {
            const existCart = await CartModel.findOne({ _id: id })
            if (existCart) {
                if (!(idProduct = await productDAO.getProductById({_id:proId}))){
                    return `this product id ${proId} doesn't exist`}
            }else{ return `Cart doesn't exist with this ID : ${id}`}

            const iNext = existCart.products.findIndex(e => String(e.product) === proId)
            const newProduct = {product: proId}
            (iNext >= 0) ? existCart.products[iNext].quantity += 1 : (existCart.products.push(newProduct));
            const cart = await existCart.save()
            return cart.products
        }
        catch (err) {
            console.log(err)
        }
    }

}

module.exports = CartDao
