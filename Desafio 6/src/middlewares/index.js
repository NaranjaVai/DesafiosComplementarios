const {getEmail} = require('../services/userService')

const adminValidation = async (req,res,next) =>{
    const aux = await getEmail(req.session?.email);
    if(aux?.rol === 'admin'){
        return next();
    }else{
        res.render('login', {status: '400', 'mesagge:': 'Only Admin Allowed'})
    }
}

const userValidation = async (req,res,next) =>{
    const aux = await getEmail(req.session?.email)
    if(aux?.rol === 'usuario'){
        return next();
    }else{
        res.send({ "mesagge" : "You're Not Authorized" })
    }
}

const logValidation = async (req,res,next) =>{
    const aux = await getEmail(req.session?.user?.email)
    (aux) ? next() : res.redirect('/login')
}

module.exports = { userValidation, adminValidation, logValidation}