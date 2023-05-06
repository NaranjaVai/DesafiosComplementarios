const { getProduct, createProduct, getProductById,updateProduct,deleteProduct } = require('../services/productService');

const getProducts = async (req, res) => {
    const limit = req.query.limit || 5;
    const pages = req.query.page || 1;       
    let result = await getProduct(limit, pages);    
    let user = req.session.user || "You're not logged" 
    
    res.render('product' ,{title: "Products", result, user});
};    

const getPById = async (req , res) => {
    const pid = req.params.pid
    let user = req.session.user || "You're not logged" 
    let result = await getProductById(pid)
    res.render('idProduct' , {title: "Producto por ID", result , user});
};

const addProduct= (req, res) => {
    let aux = createProduct(req.body);
    res.send(aux);
};

const updateProducts = async (req,res) =>{
    const pid = req.params.pid;
    const body = req.body;
    const update = await updateProduct(pid,body);
    res.send(update);
}

const removeProduct = async (req,res) =>{
    const pid = req.params.pid;
    const remove = await deleteProduct(pid);
    res.send(remove)
}
module.exports = { getProducts , addProduct , getPById,updateProducts,removeProduct};