const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Localstrategy=require('passport-local');
const passport=require('passport');
const session=require('express-session');
const path=require('path');
const http=require('http');
const socketio=require('socket.io');
const server= http.createServer(app);
const io=socketio(server);

// models
const User=require('./model/user');

//router
const authRouter=require('./routes/auth');
const chatRouter=require('./routes/chat');


mongoose.connect('mongodb://127.0.0.1:27017/chatapp')
    .then(()=>{
        console.log("DB connected");
    })
    .catch((e)=>{
        console.log("connection error");
        console.log(e.message);
    })


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({ extended: true }));




app.use(session({
    secret:"thisismysecret",
    resave:false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.currUser=req.user;
    next();
})

app.use(express.static(path.join(__dirname,'/public')));

const users=[];

io.on('connection',(socket)=>{
    // console.log(socket.id);
    socket.on('login',(data)=>{
        users.push(data.username);
        console.log(data.username);
        socket.join(data.username);
        socket.emit('loggedIn');
    })




    socket.on('messg',(data)=>{
        if(data.to)
        {
            io.to(data.to).emit('reciv',data);
            io.to(data.username).emit('reciv',data);
           // socket.broadcast.emit('reciv',data);
        }
        else
        {
            socket.broadcast.emit('reciv',data);
        }
    })
})

app.get('/',(req,res)=>{
    res.render('landing');
})




app.use(authRouter);
app.use(chatRouter);

server.listen(3001,()=>{
    console.log("server is runing at http://localhost:3001");
})

module.exports=users;