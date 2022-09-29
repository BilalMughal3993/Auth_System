const {Schema,model}= require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = Schema({
    number:{
        type: String,
        // ref: 'genreSchema',
        required: true
    }
},{timeStamps:true})

userSchema.methods.generateJWT = function(){
    const token = jwt.sign({
        _id:this._id,
        number:this.number
    },process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
}

module.exports.User = model("User",userSchema);

// const User =  model("User",userSchema)

// module.exports=User;