require('dotenv').config();
const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const {Server} = require('socket.io');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUIExpress = require('swagger-ui-express');
const {swaggerOptions} = require('./swaggerOptions')
const MongoStore = require('connect-mongo');
const {PORT , MONGODB , SECRETSESSION} = require('./config/config')
const { initializePassport } = require("./config/passport.config");
const {addLogger} = require('./utils/logger')
const app = express();
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const messageRouter = require('./routes/messageRouter');
const testRouter = require('./routes/testRouter');

app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main.hbs'}))
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/recursos', express.static(__dirname + '/public'));
app.use(addLogger);

const specs = swaggerJsDoc(swaggerOptions);
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

//const MONGODB = process.env.MONGODB_URI;
const mongoStore = MongoStore.create({
    mongoUrl: MONGODB,
    mongoOptions:{useNewUrlParser:true, useUnifiedTopology: true},
    ttl: 400
})

//const sessionPw = process.env.SECRET_SESSION;
app.use(session({
    store: mongoStore,
    secret: SECRETSESSION,
    resave:false,
    saveUninitializSed: false
}))

app.use('/api/session', userRouter); 
app.use('/api/products', productRouter); 
app.use('/api/carts', cartRouter);  
app.use("/api/messages", messageRouter);
app.use("/api/Tests", testRouter);


initializePassport();
app.use(passport.initialize());


//const PORT = process.env.PORT || 8080 ;
const server = app.listen(PORT , ()=>{
    console.log(`Server running on port: ${server.address().port}`)
}); 
server.on('error', error => console.log(error)); 

let messaggeList = [];
const io = new Server(server)

io.on('connection', socket =>{
    console.log('New client');
    io.sockets.emit('messages', messaggeList)
    socket.on('newUserLoged', user =>{
        io.sockets.emit('newUser', user)
    })
    socket.on('message', data => {
        messaggeList.push(data)        
        io.sockets.emit('messages', messaggeList)
    })
})



  