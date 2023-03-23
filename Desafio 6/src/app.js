const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars')
const MongoStore = require('connect-mongo');
const authRouter = require('./routes/auth');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main.hbs'}))
app.set('view engine', '.hbs');
app.use('/auth', authRouter)

const mongoStore = MongoStore.create({
    mongoUrl:'mongodb+srv://NaranjaVai:QwDRnfXylFfym8YT@clusternaranja.76pafxs.mongodb.net/ecommerce?retryWrites=true&w=majority',
    mongoOptions:{useNewUrlParser:true, useUnifiedTopology: true} ,
    ttl: 150
})

app.use(session({
    store: mongoStore,
    secret: 'secretSession',
    resave:false,
    saveUninitialized: false
}))



const PORT = process.env.PORT || 8080 ;
const server = app.listen(PORT , ()=>{
    console.log(`Server running on port: ${server.address().port}`)
}); 
server.on('error', error => console.log(error)); 


  