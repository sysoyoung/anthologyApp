const config = require('./db');

const user = require('../models/user');
const User = user.User;

let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport){

    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }));

}

