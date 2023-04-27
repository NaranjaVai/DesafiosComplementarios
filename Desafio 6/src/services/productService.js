const ProductsDAO = require("../daos/productDao");
const productSchema = require("../models/product");

const productDAO = new ProductsDAO('products', productSchema)

const getProduct = async (limit , page ) => {
    let aux = await productDAO.getProducts(limit , page )
    return aux
}

const getProductById = async (id) => {
    let aux = productDAO.getProductById(id)
    return aux
}

const createProduct = (product) => {
    let aux =  productDAO.createProduct(product)
    return aux
}

module.exports = { getProduct, createProduct, getProductById };