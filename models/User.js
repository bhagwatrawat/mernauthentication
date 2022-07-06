const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required:[true,"Please enter a username"],
    },
    email:{
        type: String,
        required:[true,"Please enter an email"],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email"]
    },
    password:{
        type: String,
        required:[true,"Please enter a password"],
        minlength: [8,"Password must be at least 8 characters long"],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
userSchema.pre("save",async function(next){
    const user= this;
    if(user.isModified("password")){
        user.password= await bcrypt.hash(user.password,8);
    }
    next();
})
userSchema.methods.matchPasswords= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
const User=mongoose.model("User",userSchema);
module.exports=User;
