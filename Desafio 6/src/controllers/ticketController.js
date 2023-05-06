const { productInCartService } = require('../services/cartService')
const {getProductById, updateProduct } = require('../services/productService')
const { v4: uuidv4 } = require("uuid");

const purchaseTicket = async (req, res) => {

    try {
        const idCart = req.params.cid
        const productsInCart = await productInCartService(idCart)
        let ticket
        let productToTicket = [];
        let purchaseCount = 0
        let nullTicket
            for(let productsCart of productsInCart ) {
                let productoInDb = await getProductById(productsCart.product._id)    
                
                if(productsCart.qt <= productoInDb.stock){             
                    productToTicket.push(productsCart)
                    let updateStock = productoInDb.stock - productsCart.qt
                    await updateProduct(productsCart.product._id , updateStock)
                    purchaseCount += productsCart.qt * productsCart.product.price
                    
                } else {nullTicket = productsCart.product.title}
            }          
        if(productToTicket.length){
            ticket = {
                code: uuidv4(),
                purchaseDatetime: new Date(),
                amount: purchaseCount,
                buyer: req.session?.user
            }
        }
        res.send({ticket: ticket , noPurchase: nullTicket})
    } catch (err) {
        console.log(err)
    }
}

module.exports = purchaseTicket