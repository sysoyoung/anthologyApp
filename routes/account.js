const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const parcer = require('../config/parse');

const user = require('../models/user');
const User = user.User;

const articles = require('../models/article');
const Article = articles.Article;

router.post('/reg', (req, res) => {
    const newUser = new User(
        null,
        req.body.name,
        req.body.email,
        req.body.password
    );

    User.checkExistance(req.body.email)
    .then( data => {
        if(data.boolean){
            res.json({ success: false, message: 'Email exist'});
            return;
        }
        User.hashPassword(newUser);
        res.json({ success: true, message: 'User added'});
    })
});

router.post('/auth', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    User.getUserByEmail(email)
    .then( data => {
        let user = parcer.parceObj(data);
        if(user){
            User.comparePass(password, user.password, (err, isMatch) => {
                if(err) throw err;
        
                if(isMatch) {
                    const token = jwt.sign(user, config.secret, { expiresIn: "1d" });
        
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: email,
                        }
                    })
                } else {
                    return res.json({success: false, message: "wrong password"});
                }
            });

            return;
        }
        return res.json({success: false, message: 'email not found'});
    })
});

router.get('/dashboard/:id', (req, res) => {
    let userId = req.params.id;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    const token = req.headers.authorization.split(' ')[2];
    const decoded = jwt.verify(token, config.secret);
    if(userId !== decoded.id){
        res.json({ status: false, message: 'user is not logged in'});
        return;
    }

    User.getUserById(userId)
    .then( usesrObj => {
        let user = parcer.parceObj(usesrObj);
        if(user){
            user.status = true;
            Article.getUserArticles(userId)
            .then( data => {
                let articlesArray = parcer.parseArray(data);
                for(let i = 0; i < articlesArray.length; i++){
                    articlesArray[i] = Article.parceMetaData(articlesArray[i]);
                }
                user.articles = articlesArray;
                res.json(user);
            })
            return;
        }
        res.json({ status: false, message: 'user not found'});
        return;
    })
});

module.exports = router;