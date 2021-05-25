const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');

const db = require('../config/db');
const queryHelper = require('../config/query');
class User{
    id;
    name;
    email;
    password;

    static users = [];

    constructor(id, name, email, password){
        this.id = id? id: this.createId(email);
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

    static hashPassword(user){
        bcrypt.genSalt(13, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) throw err;
                user.password = hash;
                User.saveUser(user);
            });
        });
    }

    static saveUser(user){
        let query = db.prefix + `
            insert data{
                art:user${user.id} rdf:type owl:NamedIndividual;
                            rdf:type art:User;
                            art:id "${user.id}";
                            art:name "${user.name}";
                            art:email "${user.email}";
                            art:password "${user.password}";
            }
        `;
        fetch(db.url, queryHelper.getPostObj(query));
    }

    static getUserByEmail(email){
        let query = db.prefix + `
            select ?id ?name ?password where{
                ?user art:email "${email}";
                        art:id ?id;
                        art:name ?name;
                        art:password ?password;
            }
        `;

        let url = queryHelper.createQueryUrl(query);
        return fetch(url)
                .then(res => res.json());
    }

    static getUserById(id){
        let query = db.prefix + `
            select * where{
                art:user${id} art:name ?name;
                                art:email ?email
            }
        `;

        let url = queryHelper.createQueryUrl(query);
        return fetch(url)
                    .then(res => res.json());
    }

    static comparePass(passFromUser, userPass, callback){
        bcrypt.compare(passFromUser, userPass, (err, isMatch) => {
            if(err) throw err;
            callback(null, isMatch);
        })
    }

    static checkExistance(email){
        let query = db.prefix + `ask{ ?user art:email "${email}" }`;
        let queryUrl = queryHelper.createQueryUrl(query);
        return fetch(queryUrl)
            .then( res => res.json())
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