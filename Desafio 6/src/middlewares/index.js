const authMiddleware = (req,res,next) =>{
    if(req.session.user){
     return next()
    }else{
        res.render('login', {status: 'failed'})
    }
}

const sessionValidation = (req,res,next) =>{
    if(!req.session?.user){
        return next()
    }else{
        res.render('data', {})
    }
}

module.exports = { sessionValidation, authMiddleware }