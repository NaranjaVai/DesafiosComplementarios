const mongoose = require("mongoose");

const MONGODB = process.env.MONGODB_URL;
mongoose.connect(MONGODB, error => {
    if (error) {
        console.log('Cannot connect to db')
        process.exit()
    }
});
class UserDAO {
    constructor(collection, schema) {
        this.userCollection = mongoose.model(collection, schema);
    }
    
    async createNewUser(user) {
        const newUser = await this.userCollection.create({
            ...user            
        });
        return newUser;
    }
    async findUser(user) {
        let aux = await this.userCollection.findOne({ user: user.username });
        return aux;
    }

    async findUserByUsername(userName) {
        let aux = await this.userCollection.findOne({ user: userName });
        return aux;
    }

    async findIdUser(id) {
        let aux = await this.userCollection.findOne({ _id: id });
        if (!aux) return { Error: "User not Found" };
        return aux;
    }
}

module.exports = UserDAO;