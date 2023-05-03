require('dotenv').config();
const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const {Server} = require('socket.io');
const MongoStore = require('connect-mongo');
const sessionsRouter = require('./routes/sessions')
const authRouter = require('./routes/auth');
const { initializePassport } = require("./config/passport.config");
const app = express();
const userRouter = require('./routes/userRouter.js');
const productRouter = require('./routes/productRouter.js');
const cartRouter = require('./routes/cartRouter.js');
const messageRouter = require('./routes/messageRourter.js');

app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main.hbs'}))
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/recursos', express.static(__dirname + '/public'));





const MONGODB = process.env.MONGODB_URL;
const mongoStore = MongoStore.create({
    mongoUrl: MONGODB,
    mongoOptions:{useNewUrlParser:true, useUnifiedTopology: true} ,
    ttl: 400
})

const sessionPw = process.env.SECRET_SESSION;
app.use(session({
    store: mongoStore,
    secret: sessionPw,
    resave:false,
    saveUninitializSed: false
}))

app.use('/api/session', userRouter); 
app.use('/api/products', productRouter); 
app.use('/api/carts', cartRouter);  
app.use("/api/messages", messageRouter);



initializePassport();
app.use(passport.initialize());




const PORT = process.env.PORT || 8080 ;
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



  