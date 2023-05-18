const mongoose = require("mongoose");
const userModel = require('../models/user')
const userDto = require('./DTO/userDTO');
const { MONGODB } = require('../config/config')
const convertToDto = (object) => {
    const { _id, user, email,password,rol,cartId } = object;
    let aux = new userDto(_id, user, email,password, rol,cartId);
    return aux
}

mongoose.connect(MONGODB, error => {
    if (error) {
        console.log('Cannot connect to db')
        process.exit()
    }
});
class UserDAO {
        
    async createNewUser(user, cid) {
        const newUser = await userModel.create({
            ...user,
            cartId: cid            
        });
        return convertToDto(newUser);
    }
    async findUser(user) {
        let aux = await userModel.findOne({ user: user.username }).lean();
        return ((!aux) ? `User doesn't exist ${user}` : convertToDto(aux));
    }

    async findUserByEmail(email) {
        let aux = await userModel.findOne({ email: email }).lean();
        return convertToDto(aux);
    }
    async findUserById(id) {
        const aux = await userModel.findOne({ _id: id }).lean();
        return convertToDto(aux)
    }

}

module.exports = UserDAO;