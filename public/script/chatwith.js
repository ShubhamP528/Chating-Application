const socket=io();
const chat=document.querySelector('textarea');
const list=document.querySelector('#list');
const U=document.querySelector('#user');
const btnChat=document.querySelector('.btnChat');
const to=document.querySelector('#to');



// const user={};

socket.emit('login',{username:$('#username').val()});
socket.on('loggedIn',()=>{console.log("Successfully LoggedIn")});

btnChat.addEventListener('click',()=>{
    socket.emit('messg',{messg:chat.value, to:to.value,username:$('#username').val()});
    chat.value="";
})


socket.on('reciv',(data)=>{
    // console.log(data);
    // const li=document.createElement('li');
    // li.append(`${data.username} says :- ${data.messg}`);
    // list.append(li);
    const mes=document.createElement('div');
    mes.append(`${data.username} says :- ${data.messg}`);
    const user=U.innerText
    if(data.username===user){
        mes.setAttribute("class","right")
        console.log(user)
    }
    list.append(mes);
})