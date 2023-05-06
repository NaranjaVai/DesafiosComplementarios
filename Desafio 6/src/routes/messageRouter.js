const { Router } = require("express");
const messageRouter = Router();

messageRouter.get('/', (req,res)=>{
    
    res.render('message' ,{title: "chat", })
});


module.exports = messageRouter;