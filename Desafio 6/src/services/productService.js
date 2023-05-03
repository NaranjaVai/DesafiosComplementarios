const productRepository = require('../repository/productRepository');
const repoProduct = new productRepository();


const getProduct = async (limit, page ) => {
    let aux = await repoProduct.getProductRepository(limit, page )
    return aux
}

const getProductById = async (id) => {
    let aux = repoProduct.getProductByIdRepository(id)
    return aux
}

const createProduct = async (product) => {
    let aux =  repoProduct.createProductRepository(product)
    return aux
}

const updateProduct = async (pid, update) => {
    let aux = repoProduct.updateProductIdRepository(pid,update)
    return aux;
}

const deleteProduct = async (id) => {
    let aux = repoProduct.deleteProductByIdRepository(id);
    return aux;
}

module.exports = { getProduct, createProduct, getProductById,updateProduct,deleteProduct };