const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const sessionsRouter = require('./routes/sessions')
const authRouter = require('./routes/auth');
const { initializePassport } = require("./config/passport.config");
const app = express();

app.use(express.static('public'));
app.use('/recursos', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

initializePassport();

app.use(passport.initialize());
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main.hbs'}))
app.set('view engine', '.hbs');

const PORT = process.env.PORT || 8080 ;
const server = app.listen(PORT , ()=>{
    console.log(`Server running on port: ${server.address().port}`)
}); 
server.on('error', error => console.log(error)); 


const mongoStore = MongoStore.create({
    mongoUrl:'mongodb+srv://NaranjaVai:QwDRnfXylFfym8YT@clusternaranja.76pafxs.mongodb.net/ecommerce?retryWrites=true&w=majority',
    mongoOptions:{useNewUrlParser:true, useUnifiedTopology: true} ,
    ttl: 400
})


app.use(session({
    store: mongoStore,
    secret: 'secretSession',
    resave:false,
    saveUninitializSed: false
}))

app.use('/sessions', sessionsRouter);
app.use('/auth', authRouter)



  