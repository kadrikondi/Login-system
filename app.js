const express = require ('express')
const bodyParser =require('body-parser')
const path = require('path')
const mongoose = require ('mongoose')
const exphbs= require('express-handlebars')
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')
const expressValidator = require('express-validator')
const router = require('./routes/index')
const passportLogic = require('./config/passport')(passport)

const app = express()



//body parser middle ware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use(express.static(path.join(__dirname,'public')))
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
//express sesion
 app.use(session({
     secret:'kondi',
     saveUninitialized:true,
     resave:true

     }));
     //passport  middleware init 
     app.use(passport.initialize());
     app.use(passport.session());
      //flash midlleware
      app.use(flash())
      app.use((req,res,next)=>{
          res.locals.success_msg= req.flash('success_msg')
          res.locals.error_msg= req.flash('error_msg')
          //express errorr midlleware
          res.locals.error= req.flash('error')   ; 
          res.locals.user = req.user || null
          next()
      })
 

     //express validator
     app.use(expressValidator({
         errorFormatter:(param,msg,value)=>{
             const namespace= param.split('.'),
             root = namespace.shift()
             , formParam= root;
             while(namespace.length){
                 formParam += '[' + namespace.shift()+ ']';

             }
             
             return{
                 
             param:formParam,
             msg:msg,
             value:value


             };  
                   }
     }))

    

app.use('/', router)








const port =5000
app.listen(port,()=>{
    console.log(`app run at port ${port}`)
})