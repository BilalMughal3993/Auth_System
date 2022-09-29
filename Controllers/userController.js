const bcrypt = require("bcrypt");
const optGenerator = require("otp-generator");
const axios = require("axios")
const _ =require("lodash") 


const {User} = require("../Model/userModel")
const {Otp} = require("../Model/otpModel")


module.exports.signUp = async (req,res)=>{

    const user = await user.User.findOne({
        number : req.body.number
    })
    if(user)return res.status(400).send("User Already register")

    const OTP = optGenerator.generate(6,{
        digits:true,
        alphabets:false,
        upperCase:false,
        specialChars:false

    });
    const number = req.body.number;
    console.log(OTP)
    const otp = new Otp({
        number:number,
        otp:OTP
    });
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp,salt)
    const result =  await otp.save()

    return res.status(200).send("OTP send successfully")
}
module.exports.verifyOtp = async (req,res)=>{
    
}