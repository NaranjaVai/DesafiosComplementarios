const { getProduct, createProduct, getProductById } = require('../services/productService');

const getProducts = async (req, res) => {
    const limit = req.query.limit || 3;
    const page = req.query.page || 1;       
    let result = await getProduct(limit, page);    
    let user = req.session.user || "You're not logged" 
    
    res.render('productsHBS' ,{title: "Productos", result, user});
};    

const getPById = async (req , res) => {
    const pid = req.params.pid
    let user = req.session.user || "You're not logged" 
    let result = await getProductById(pid)
    res.render('productIDHBS' , {title: "Producto por ID", result , user});
};

const addProduct= (req, res) => {
    let response = createProduct(req.body);
    res.send(response);
};

module.exports = { getProducts , addProduct , getPById};