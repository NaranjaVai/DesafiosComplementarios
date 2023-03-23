const {createHash, isValidPassword} = require('../utils/index');
const {Router} = require('express')
const {authMiddleware, sessionValidation} = require('../middlewares/index')
const mongoose = require('mongoose');
const userModel = require('../models/user');
const authRouter = Router();

mongoose.connect('mongodb+srv://NaranjaVai:QwDRnfXylFfym8YT@clusternaranja.76pafxs.mongodb.net/ecommerce?retryWrites=true&w=majority')
        .then(res => console.log('DB connected'))
        .catch(err => console.log(err))

authRouter.get('/login', sessionValidation, (req,res)=>{
    res.render('login', {})
})

authRouter.post('/login', sessionValidation, async (req,res)=>{
    let user = req.body;
    let aux = await userModel.findOne({ email : user.emailClient})
    if(!aux || !isValidPassword(aux, user.password)){    
      res.render('login-error', {message:'Invalid Data'})}
      else{ 
        req.session.user = aux.emailClient;
    res.render('data', { user : req.session.user})}
})

authRouter.get('/Logueados', authMiddleware, (req,res) =>{
    res.render('data', {})
})



authRouter.get('/register', sessionValidation, (req,res) =>{
    res.render('register', {})
})

authRouter.post('/register', sessionValidation, async (req,res) =>{
    const e_mail = req.body.emailClient;
    try{
        let user = await userModel.findOne({email : e_mail})
        if(user){
            res.render('register-error', {})
        }
        const {nameClient, surNameClient, ageClient, password} = req.body;
        let newUser = {
            nameClient,
            surNameClient,
            ageClient,
            e_mail,
            password: createHash(password)
        }
        const userSaveModel = userModel(newUser)
        await userSaveModel.save();
    } catch (error){
        console.log(error);
        res.render('register-error', {})
    }


    console.log(req.body)
    res.render('login', {message: 'Registro exitoso', status:'success'});
})


authRouter.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
            res.redirect('/auth/login');
    })
})

module.exports = authRouter;