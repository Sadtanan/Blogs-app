const jwt = require("jsonwebtoken")
const { expressjwt: auth } = require('express-jwt');

exports.login=(req,res)=>{
    //ข้อมูล username , password
    const {username,password} = req.body
    if(password === process.env.PASSWORD){
        //login เข้าสู่ระบบ
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    }else{
        return res.status(400).json({error:"รหัสผ่านไม่ถูกต้อง!"})
    }
}

// ตรวจสอบ token (Middleware)
exports.requireLogin = auth({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth"
});