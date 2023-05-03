const UserDao = require('../daos/userDao');
const user = new UserDao();

class UserRepository {

    createUserRepository = async (user, cartId) => {
        const newUser = await user.createNewUser(user, cartId);
        return newUser;
    };

    getUserByEmailRepository = async (email) => {
        const user = await user.findUserByEmail(email);
        return user;
    }

    findUserRepository = async (user) => {
        const userInDB = await user.findUser(user);
        return userInDB;
    };
    findUserByIdRepository = async (id) => {
        const userInDB = await user.findUserById(id);
        return userInDB;
    };
    
}

module.exports = UserRepository