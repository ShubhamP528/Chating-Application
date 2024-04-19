const socket = io();
const chat = document.querySelector("textarea");
const list = document.querySelector("#list");
const U = document.querySelector("#user");
const btnChat = document.querySelector(".btnChat");
const to = document.querySelector("#to");
const textarea = document.getElementById("message");

// const user={};

socket.emit("login", { username: $("#username").val() });
socket.on("loggedIn", () => {
  console.log("Successfully LoggedIn");
});

btnChat.addEventListener("click", () => {
  const messageText = chat.value.trim();
  if (messageText === "") {
    return;
  }
  socket.emit("messg", {
    messg: messageText,
    to: to.value,
    username: $("#username").val(),
  });
  chat.value = "";
  textarea.style.height = "50px";
});

socket.on("reciv", (data) => {
  // console.log(data);
  // const li=document.createElement('li');
  // li.append(`${data.username} says :- ${data.messg}`);
  // list.append(li);
  const mes = document.createElement("div");
  const sp = document.createElement("span");
  mes.append(sp);
  sp.append(`${data.messg}`);
  sp.setAttribute("class", "sp");
  const user = U.innerText;
  if (data.username === user) {
    mes.setAttribute("class", "right");
    // console.log(user);
  } else {
    mes.setAttribute("class", "left");
  }
  list.append(mes);
  list.scrollTop = list.scrollHeight;
});

textarea.addEventListener("keyup", (e) => {
  textarea.style.height = "50px";
  let height = e.target.scrollHeight;
  textarea.style.height = `${height}px`;
});
