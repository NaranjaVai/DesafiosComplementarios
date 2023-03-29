const passport = require('passport')
const GithubStrategy = require('passport-github2');
const userModel = require('../models/user');

const initializePassport = () =>{
    passport.serializeUser((user,done) =>{
        done(null, user._id);
    })

    passport.deserializeUser(async (id,done) => {
        let aux = await userModel.findOne ({ _id : id});
        done(null,aux)
    })

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.946f323d3826cad1',
        clientSecret: '8aaf142f3e5a655220ca11e2aa569658389bfe04',
        callbackURL: 'http://localhost:8080/sessions/githubcallback',
        scope: ['user: email']
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            let aux = await userModel.findOne({ email: profile.emails[0].value})
            
            if (!aux){
                let newUser = {
                    firstName : profile._json.login,
                    lastName : '',
                    age: '',
                    email: profile.emails[0].value,
                    password: ''
                }   
                let result = await userModel.create(newUser)
                done(null, result)
            }else{ done(null, aux)}
        }catch(err){ done(err)}
    }))
}

module.exports = {initializePassport};