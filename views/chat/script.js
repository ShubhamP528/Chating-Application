const socket=io();
const chat=document.querySelector('textarea');
const list=document.querySelector('#list');


// const user={};


$('.btnChat').click(()=>{
    socket.emit('messg',{messg:chat.value, name:$('#username').val(), to:$('#to').val()});
    chat.value="";
})


socket.on('reciv',(data)=>{
    const mes=document.createElement('div');
    mes.append(`${data.name} says - ${data.messg}`);
    if(data.name===currUser.username){
        mes.setAttribute("class","right")
    }
    list.append(mes);
})
