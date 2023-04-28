const mongoose = require("mongoose");
const userModel = require('../models/user')
const userDto = require('./DTO/userDTO');
const convertToDto = (object) => {
    const { _id, user, email,password,rol,cartId } = object;
    let aux = new userDto(_id, user, email,password, rol,cartId);
    return aux
}
const MONGODB = process.env.MONGODB_URL;
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
        let aux = await userModel.findOne({ user: user.username });
        return ((!aux) ? `User doesn't exist ${user}` : convertToDto(aux));
    }

    async findUserByEmail(email) {
        let aux = await userModel.findOne({ email: email }).lean();
        return convertToDto(aux);
    }

}

module.exports = UserDAO;