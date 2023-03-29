const mongoose = require('mongoose');
const userModel = require('../models/user');
const {createHash, isValidPassword} = require('../utils/index');
const Router = require('express')
const {authMiddleware, sessionValidation} = require('../middlewares/index')
const authRouter = Router();

mongoose.connect('mongodb+srv://NaranjaVai:QwDRnfXylFfym8YT@clusternaranja.76pafxs.mongodb.net/ecommerce?retryWrites=true&w=majority')
        .then(res => console.log('DB connected'))
        .catch(err => console.log(err))


        
authRouter.get('/login', sessionValidation, (req,res)=>{
    res.render('login', {})
})

authRouter.post('/login', async (req,res)=>{
    const user = req.body;
    console.log(user);
    let aux = await userModel.findOne({ email : user.userMail})
    if(!aux || !isValidPassword(aux, user.password)){    
      res.render('login-error', {message:'Invalid Data'})}
      else{ 
        req.session.user = aux.emailClient;
        //console.log('HOLAAAAAAAAA', req.session.user)
    res.render('data', { aux})}
})




authRouter.get('/Logueados', authMiddleware, (req,res) =>{
    res.render('data', {})
})

authRouter.get('/register', sessionValidation, (req,res) =>{
    res.render('register', {})
})

authRouter.post('/register', sessionValidation, async (req,res) =>{
    const e_mail = req.body.userMail;
    try{
        let user = await userModel.findOne({email : e_mail})
        if(user){
            res.render('register-error', {})
        }
        const {name, surname, age, password} = req.body;
        let newUser = {
            firstName : name,
            lastName : surname,
            age : age,
            email : e_mail,
            password: createHash(password)
        }
        const userSaveModel = userModel(newUser)
        console.log(userSaveModel)
        await userSaveModel.save();
    } catch (error){
        console.log(error);
        res.render('register-error', {})
    }


    console.log(req.body)
    res.render('login', {message: 'Registro exitoso', status:'success'});
})


authRouter.get('/logout', async (req,res)=>{
    await req.session.destroy(err =>{
            res.redirect('/auth/login');
    })
})

module.exports = authRouter;