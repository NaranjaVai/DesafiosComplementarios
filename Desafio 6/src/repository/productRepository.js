const ProductsDao = require('../daos/productDao');
const product = new ProductsDao();

class productRepository {

    createProductRepository = async (prod) => {
        const newProduct = await product.createProduct(prod);
        return newProduct;
    };

    getProductRepository = async (limit, page) => {
        const products = await product.getProducts(limit, page);
        return products;
    }

    getProductByIdRepository = async (id) => {
        const product = await product.getProductById(id);
        return product;
    };
}

module.exports = productRepository