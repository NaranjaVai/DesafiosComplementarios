const mongoose = require("mongoose");
const MONGODB = process.env.MONGODB_URL
mongoose.connect(MONGODB, error => {
    if (error) {
        console.log('Connection error')
        process.exit()
    }
});

class ProductsDao {

    constructor(collection, schema) {
        this.productsCollection = mongoose.model(collection, schema);
    }
    //solve ------------
    async getProducts(limit , page) {
        try {
                    
            let products = await this.productsCollection.paginate( {} , { limit: limit, page: page , lean:true})            
                products.prevLink = products.hasPrevPage?`http://localhost:8080/api/products?page=${products.prevPage}`:'';         
                products.nextLink = products.hasNextPage?`http://localhost:8080/api/products?page=${products.nextPage}`:'';
                                  
            return products
        } catch (err) {
            console.log(err)
        }
    }

    async createProduct(product) {
        try {
            let newProduct = new this.productsCollection(product)
            let result = await newProduct.save()
            return result
        } catch (err) {
            console.log(err)
        }
    }

    async getProductById(id) {
        try {
            const product = await this.productsCollection.findOne({ _id: id }).lean()
            return ((!product) ? `product doesn't exist ${id}` : product);
        }
        catch (error) {
            console.log(error)
        }

    }
};


module.exports = ProductsDao;