const { Router } = require('express');
const userRouter = Router();
const passport = require("passport");
const {postUserLogin, getRegister, getUser, getUserRegister, test, sessionLogout} = require("../controllers/sessionController.js")

userRouter.get("/login", getUser);
userRouter.post("/login", postUserLogin);
userRouter.get("/register", getRegister);
userRouter.post("/register", getUserRegister);
userRouter.get("/logout", sessionLogout);
userRouter.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);
userRouter.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "api/login" }),
    async function (req, res) {
        req.session.user = req.user;
        res.redirect("/api/products");
    }
);
userRouter.get('/test', test)
userRouter.post('/logout', sessionLogout)
module.exports = userRouter;