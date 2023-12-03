const express=require("express");
const router=express.Router();
const User=require("../model/user");
const passport=require("passport");



router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

router.post('/register',async(req,res)=>{
    const user=new User({username:req.body.username,email:req.body.email});
    await User.register(user,req.body.password);
    res.redirect('/login');
})

router.get('/login',(req,res)=>{
    res.render('auth/login');
})

router.post('/login',passport.authenticate('local',{
    failureRedirect:'/login'    
}),(req,res)=>{
    res.redirect('/');
})

router.get('/logout',(req,res)=>{
    req.logOut(()=>{
        res.redirect('/login');
    });
})










module.exports=router;