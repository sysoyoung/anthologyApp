const bcrypt = require('bcryptjs');
//подкулючение к бд должно быть

class User{
    id;
    name;
    email;
    password;

    static users = [];

    constructor(name, email, password){
        this.id = this.createId(email);
        this.name = name;
        this.email = email;
        this.password = password;
    }

    createId(email){
        let newId = email.replace(/@.+/, '').split('');
        let a = '', b ='';
        for(let i = 0; i < newId.length; i++)
            i%2==0? a += newId[i] : b += newId[i];

        let number = +(a+b).split('').map( word => word.charCodeAt(0)-48).join('');
        return number.toString(16);
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