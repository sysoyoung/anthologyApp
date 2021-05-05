const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const user = require('../models/user');
const User = user.User;

router.post('/reg', (req, res) => {
    
    const newUser = new User(
        req.body.name,
        req.body.email,
        req.body.password
    );
    const unswer = User.addUser(newUser);

    res.send({ success: (unswer == 'User added'), message: unswer});
});

router.post('/auth', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    const user = User.getUserByEmail(email);
    if(!user){
        return res.json({success: false, message: 'email not found'});
    }

    User.comparePass(password, user.password, (err, isMatch) => {
        if(err) throw err;

        if(isMatch) {
            const token = jwt.sign(user, config.secret, { expiresIn: "10h" });

            res.json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            })
        } else {
            return res.json({success: false, message: "wrong password"});
        }
    });
});

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('user cab');
});

// TESTINg ROUTS--------------

router.get('/getusers', (req, res) => {
    res.send((User.getUsers()));
});

router.get('/setuser', (req, res) => {
    
    let newUser = new User( 'qwe qwe', 'qwe@qwe.qwe', 'qweqwe');
    let unswer = User.addUser(newUser);

    res.send(unswer);
});

module.exports = router;