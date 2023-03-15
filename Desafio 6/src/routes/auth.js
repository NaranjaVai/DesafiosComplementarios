const {Router} = require('express')
const mongoose =require('mongoose')
const authRouter = Router();

mongoose.connect('mongodb+srv://NaranjaVai:QwDRnfXylFfym8YT@clusternaranja.76pafxs.mongodb.net/ecommerce?retryWrites=true&w=majority')
        .then(res => console.log('DB connected'))
        .catch(err => console.log(err))

authRouter.get('/login', (req,res)=>{
    res.render('login', {})
})

authRouter.post('/login', (req,res)=>{
    console.log(req.body)
    res.send('ok')
})


authRouter.get('/register', (req,res) =>{
    res.render('register', {})
})

authRouter.post('/register', (req,res) =>{
    console.log(req.body)
    res.send('Register completed');
})


module.exports = authRouter;