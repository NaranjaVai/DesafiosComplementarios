import { Router } from "express";
import CustomError from "../services/errors/customError";
import EErrors from "../services/errors/enums";
import { generateProductErrorInfo } from "../services/errors/info";
import { generarProductos } from "../mocks/index";
const productRouter = Router()
const products = []




productRouter.get('/mockingProducts', (req,res) =>{
    res.send({status: 'success', payload: products})
})

productRouter.post('/mockingProducts', (req,res) =>{
    let product = generarProductos(100);
    products = product.map((p) =>{
        if(!p.name || !p.description || !p.price || !p.image || !p.category){
            CustomError.createError({
                name:'Product Creation Error',
                cause: generateProductErrorInfo({p}),
                message:'Error trying to create product',
                code: EErrors.ERROR_INVALID_TYPE
                
            })
        }
    })
    
    res.send({status: 'success', payload: products})
})



export default productRouter;


/* productRouter.post('/', (req,res) =>{
    const {firstName,lastName,email} = req.body;
    if(!firstName || !lastName || !email){
        CustomError.createError({
            name:'User Creation Error',
            cause: generateUserErrorInfo({firstName,lastName,email}),
            message:'Error trying to create user',
            code: EErrors.ERROR_INVALID_TYPE
            
        })
    }
    const user ={
        firstName,
        lastName,
        email
    }
    (users.length === 0) ? user.id = 1 : user.id = users[users.length - 1].id + 1
    users.push(user)

    res.send({status: 'success', payload: user})
})

productRouter.get('/:uid', (req,res) =>{
    const uid = parseInt(req.params.uid)
    if(isNaN(uid) || uid < 0 || uid === undefined){
        CustomError.createError({
            name:'User Creation Error',
            cause: generateUIDErrorInfo({uid}),
            message:'Error trying to create user',
            code: EErrors.INVALID_PARAMS
        })
    }
    res.send(uid)

}) */