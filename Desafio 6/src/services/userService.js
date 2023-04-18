const UserDAO = require('../daos/userDao.js')
const userSchema = require('../models/user.js')
const userDAO = new UserDAO('users', userSchema)

const createUser = async (user) => {    
    const aux = await userDAO.createNewUser(user)
    return aux
}

const userLogin = async (user) => {
    const userMongoDb = await userDAO.findUser(user);
    return userMongoDb;
};

const getUserByIdService = async (id) => {
    const userID = await userDAO.findIdUser(id);
    return userID
}

const getUserByUsername= async (nameUser) => {
    const aux = await userDAO.findUserByUsername(nameUser)
    return aux
}

module.exports = { createUser, userLogin, getUserByIdService , getUserByUsername}