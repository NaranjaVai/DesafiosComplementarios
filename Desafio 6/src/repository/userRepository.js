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

    findUserRRepository = async (user) => {
        const userInDB = await user.findUser(user);
        return userInDB;
    };
}

module.exports = UserRepository