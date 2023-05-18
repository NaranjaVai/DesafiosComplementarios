const mongoose = require("mongoose");
const productModel = require('../models/product')
const productDTO = require('./DTO/productDTO');
const { MONGODB } = require('../config/config')


mongoose.connect(MONGODB, error => {
    if (error) {
        console.log('Connection error')
        process.exit()
    }
});

const convertToDto = (object) => {
    const { _id, title, description,price, stock, category, thumbnail} = object;
    let aux = new productDTO(_id, title, description,price, stock, category, thumbnail);
    return aux
}

class ProductsDao {

    async getProducts(limit , page) {
        try {
                    
            let products = await productModel.paginate( {} , { limit: limit, page: page , lean:true})            
                products.prevLink = products.hasPrevPage?`http://localhost:8080/api/products?page=${products.prevPage}`:'';         
                products.nextLink = products.hasNextPage?`http://localhost:8080/api/products?page=${products.nextPage}`:'';
            return products
        } catch (err) {
            console.log(err)
        }
    }

    async createProduct(product) {
        try {
            let newProduct = new productModel(product)
            let aux = await newProduct.save()
            return aux
        } catch (err) {
            console.log(err)
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findOne({ _id: id }).lean()
            return ((!product) ? `product doesn't exist ${id}` : convertToDto(product));
        }
        catch (error) {
            console.log(error)
        }
    }
    async UpdateProductById(pid, update) {
        try {
            const validateProduct = await productModel.findByIdAndUpdate({ _id: pid }, {stock: update}, { new: true })
            if (validateProduct == null) {
                return { error: `Product with id:${pid} not found` }
            }
            return {message:`Producto actualizado! ID:${pid}` }

        } catch (err) {
            console.log(err)
        }
    }

    async deleteProductById(pid) {
        try {
            const deleteProduct = await productModel.deleteOne({ _id: pid })
            if (deleteProduct == null) {
                return { error: `Product not found! id:${pid}` }
            }
            const aux = { message: `The product has been successfully deleted! id: ${pid}` }
            return aux
        } catch (err) {
            console.log(err)
        }
};
}

module.exports = ProductsDao;