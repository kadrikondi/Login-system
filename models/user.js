const mongoose =require('mongoose')
//get rid of promise warning
mongoose.Promise = global.Promise
//connect db
 mongoose.connect('mongodb://localhost/userlogin')
 .then(()=>{
     console.log('Mongodb is connected')
 })
 .catch((err)=>{
     console.log(err)
 })
 
const Schema= mongoose.Schema

const userSchema= new Schema({
    name:{
        type:String,required:true

    },
    username:{
        type:String, unique:true
    },
    email:{
        type:String, required:true, unique:true
    },
    
    password:{
        type:String,required:true},
    date:{
            type:Date,
            default:Date.now()
        }


})


module.exports=mongoose.model('User', userSchema)