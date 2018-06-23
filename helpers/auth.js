module.exports= {
    ensureAuthenticated: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next()

        }else{
            req.flash('error_msg', 'Not Authorized! You need to login')
            res.redirect('/login')
        }
    }
}


// function ensureAuthenticated(req,res,next){
//     if(req.isAuthenticated()){
//         return next

//     }else{
//         req.flash('error_msg', 'Not Authorized! You need to login')
//         res.redirect('/login')
//     }
// }


// module.exports= ensureAuthenticated


