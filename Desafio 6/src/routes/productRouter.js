const {Router} = require('express');
const { getProducts , addProduct , getPById,updateProducts,removeProduct} = require("../controllers/productController.js");
const {adminValidation, logValidation} = require('../middlewares/index.js')
const productRouter = Router();

productRouter.get('/', logValidation ,getProducts);
productRouter.get('/:pid', logValidation , getPById);
productRouter.post('/',adminValidation, addProduct);
productRouter.put('/:pid', adminValidation, updateProducts)
productRouter.delete('/delete/":pid', adminValidation, removeProduct)

module.exports = productRouter;