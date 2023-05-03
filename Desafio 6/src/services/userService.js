const UserRepository = require('../repository/userRepository')
const userRepository = new UserRepository();

const createUser = async (user) => {
    const newCartUser = await createUser();    
    const aux = await userRepository.createUserRepository(user, newCartUser._id)
    return aux
}

const userLogin = async (user) => {
    const aux = await userRepository.findUserRepository(user);
    return aux;
};

const getUserByIdService = async (id) => {
    const userID = await userRepository.findUserByIdRepository(id);
    return userID
}

const getEmail = async (userEmail) => {
    const aux = await userRepository.getUserByEmailRepository(userEmail)
    return aux
};

module.exports = { createUser, userLogin, getUserByIdService , getEmail}