const mongoose = require("mongoose");
const CartModel = require('../models/cart')
const CartDto = require('./DTO/cartDTO')
const { MONGODB } = require('../config/config')

mongoose.connect(MONGODB, error => {
    if (error) {
        console.log('Cannot connect to db')
        process.exit()
    }
});

const convertToDTO = (cart) => {
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

    async getCart() {
        try {
        let aux = await CartModel.find().lean()
        return aux
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
                return `Cart with id: ${cartId} not found` }
            const aux = existCart.products
            return aux
            
        }catch (error) {
            console.log(error)
        }
    }

    async addProductCart(id, proId) {
        try {
            const existCart = await CartModel.findOne({ _id: id })
            if (existCart) {return `Cart doesn't exist with this ID : ${id}`}
            const iNext = existCart.products.findIndex(e => String(e.product) === proId)
            const newProduct = {product: proId}
            (iNext >= 0) ? existCart.products[iNext].quantity += 1 : (existCart.products.push(newProduct));
            const cart = await existCart.save()
            const aux = convertToDTO(cart)
            return aux.products
        }
        catch (err) {
            console.log(err)
        }
    }
    async removeProductCart(id, pid){
        try{
            const cart = CartModel.findOne({_id:id})
            if (!cart) {return { error: `Cart doesn't exist with this id: ${id}` };}
            const itemIndex = cart.products.findIndex(p => String(p.product === pid))
            if (itemIndex < 0 ){
                return {error : `Product with ID: ${pid} not found `}
            }
            cart.products.splice(itemIndex, 1);
            const newCart = await cart.save();
            const aux = convertToDTO(newCart)
            return aux.products;
        }catch{

        }
    }
}

module.exports = CartDao
