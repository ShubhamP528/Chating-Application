const express=require("express");
const router=express.Router();
const User=require('../model/user');
const {isLoggedIn}=require('../middleWare');
const users=require('../index');



router.post('/newChat',isLoggedIn,async(req,res)=>{
    try{
        const obj = await User.find();
        res.render('chat/allUser',{obj,users});
    }
    catch(err){
        req.flash('error',`${err.message}`)
        console.log(err);
    }

})
router.post('/chatwith/:username',isLoggedIn,(req,res)=>{
    try{
        const {username}=req.params;
        const name=req.user;
        // console.log(username);
        // console.log(name);
        res.render('chat/chatwith',{username,name});
    }catch(e){
        req.flash('error',`${err.message}`)  
    }

})











module.exports=router;