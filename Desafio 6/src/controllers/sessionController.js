const { createUser, userLogin } = require('../services/userService.js');
const { isValidPassword } = require('../utils/index.js');

const getUser = async (req, res) => {
    res.render("login", {})
};

const postUserLogin = async (req, res) => {
    try {
        const loginUser = await userLogin(req.body.user);        
        const validate = isValidPassword(loginUser, req.body.password);
        if (validate) {
            req.session.user = loginUser.user;
            req.session.email = loginUser.email
            req.session.rol = loginUser.rol;
            req.session.idCart = loginUser.idCart
            let aux = req.session.user;
            res.render('data',{aux});
        } else {
            res.send('login-error',{});
        }        
    } catch (e){
        res.status(500).send("hubo un error!")
        console.log(e);
    };
};

const test = (req, res) => {
    console.log("la session que llega:")
    console.log(req.session)
    res.render("loginAccess", {})
};

const getRegister = (req, res) => {
    res.render("register", {});
};
//////
const getUserRegister = async (req, res) => {
    console.log(req.body);
    newUser = req.body;
    await createUser(newUser);
    //res.render('register',{})
};

const sessionLogout = async (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send('Logout ok!');
        else res.send({ status: 'Logout ERROR', body: err });
    })
};


module.exports = { postUserLogin, getRegister, getUser, getUserRegister, test, sessionLogout }