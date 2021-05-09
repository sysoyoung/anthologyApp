const bcrypt = require('bcryptjs');
//подкулючение к бд должно быть

class User{
    id;
    name;
    email;
    password;

    static users = [];

    constructor(name, email, password){
        this.id = [name,email].join('_');
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static addUser(user){
        if(User.users.find( item => item.email == user.email)){
            return 'Email exist';
        }

        bcrypt.genSalt(13, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) throw err;
                user.password = hash;
                User.users.push(user);
            });
        });

        return 'User added';
    }

    static getUsers(){
        return User.users;
    }

    static getUserByEmail(mail){
        const tempUser = User.users.find(user => user.email === mail);
        return tempUser ? {
            id : tempUser.id,
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password
        } : false;
    }

    static getUserById(id){
        const tempUser = User.users.find(user => user.id === id);
        return tempUser ? {
            id,
            name: tempUser.name,
            email: tempUser.email,
        } : false;
    }

    static comparePass(passFromUser, userPass, callback){
        bcrypt.compare(passFromUser, userPass, (err, isMatch) => {
            if(err) throw err;
            callback(null, isMatch);
        })
    }

    static findOne({id}, callback){
        let user = User.users.find( user => user.id == id) || '';
        if(user)
            return callback(null, user);

        return callback(new Error('user not found'), null);
    }
}

module.exports = {
    User: User,
};