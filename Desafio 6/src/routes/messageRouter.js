const { Router } = require("express");
const messageRouter = Router();

messageRouter.get('/', (req,res)=>{
    
    res.render('messagesHBS' ,{title: "chat", })
});


module.exports = messageRouter;