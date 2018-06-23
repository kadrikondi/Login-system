 const User = require('../models/user')
 const bcrypt =require('bcryptjs')
 const passport = require('passport')
 





 //login page
 exports.loginUser=(req,res,)=>{
     res.render('login')
 }
 //login process
 exports.loginProcess= (req, res, next)=>{
     passport.authenticate('local', {
         successRedirect:'/',
         failureRedirect:'/login',
         failureFlash:true
     })(req,res,next);

 }

// access controls
 function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next

    }else{
        req.flash('error_msg', 'Not Authorized! You need to login bro')
        res.redirect('/login')
    }
}



//register page
exports.registerpage= (req,res)=>{
    
    res.render('register')

}
//register process route
exports.processregister =(req,res)=>{
    const body=req.body;
    const name= body.name;
    const username = body.username;
    const email = body.email;
    const password = body.password;
    const password2 = body.password2;


    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('username', 'username required').notEmpty();
    // req.checkBody('email', 'enter valid mail').isEmail();
    req.checkBody('email', 'enter field required').notEmpty();
    req.checkBody('password', 'password required').notEmpty();
    req.checkBody('password2', 'password not match').equals(req.body.password)
    let errors = req.validationErrors()

    if(errors){
        res.render('register',{
            errors:errors
        })

    }else{
        const newUser = new User({
            name:name,
            username:username,
            email:email,
            password:password

        })
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt, (err,hash)=>{
                if (err) throw err
                newUser.password=hash
                newUser.save()
                .then(user=>{
                    req.flash('success_msg', 'You are now Registered you can now login')
                    res.redirect('/login')
                })
            })

        })
        
        return;
    }
}



//logout
exports.logoutprocess= (req,res) =>{
    req.logout()
    req.flash('success_msg', 'You are now logout')
    res.redirect('/login')
}
exports.confirmMail= (req,res)=>{
    res.render('forgetpass' ,{title:'enter valid mail'})
}


exports.confirmMailprocess=(req,res)=>{
    


    const puted =req.body.email;
    if(!puted){
        console.log(req.body.email +' empty')
        req.flash('error_msg', ' email field is empty')
        res.redirect(`/confirm`)
        
        
    } else {
    let iemail= User.find({})

        User.findOne({email:puted})
        .then(user=>{
            if(user.email === puted ){
                req.flash('success_msg', 'Check Your Mail inbox for Your Password')
                console.log(  `${user.email} email entered`)
                res.redirect('/login')
                console.log(iemail)
            }
            else if(iemail == Null){
                req.flash('error_msg', 'email not Found ')
                console.log('bad email')
                res.redirect('/login')
               
            }else{console.log('bad coded')}
        
        })
        .catch((err)=>{
            console.log(err)
        })
        
        
    }
}