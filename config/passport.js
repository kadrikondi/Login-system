const User = require('../models/user')
const  bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy




module.exports= (passport)=>{
    passport.use(new LocalStrategy((username,password,done)=>{
        User.findOne({
            username:username
        }).then(user=>{
            if(!user){
                return done( null, false, {message:'user not found'})
            }

            // compare pasword
         bcrypt.compare(password,user.password,(err,isMatch)=>{
             if(err) throw err;
             if(isMatch){
                 return done(null, user)
             }else{
                 return done(null, false, {message:'incorrect password'})
             }
         })
        })
    }))


    passport.serializeUser((user, done)=>{
        done(null, user.id)
    });
    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user);

        })
    })
}