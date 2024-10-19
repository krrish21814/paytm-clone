const mongoose = require("mongoose");



mongoose.connect("mongodb+srv://mjkrishnagad:cxvx70qzo03RPtEP@cluster0.i4muh.mongodb.net/paytm")
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });



const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
})


const accountSchema = new mongoose.Schema({
   userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
   },
   balance:{
    type:Number,
    required:true
   } 
});

const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account',accountSchema)

module.exports={
    User,
    Account,
}