const socket = io();
const usersList = document.querySelector(".users-name");
const chatForm = document.getElementById("message-form");
const inputField = document.querySelector("#msg");
const messages = document.querySelector(".messages");

// getting username from index.html
const {username} = Qs.parse(location.search, {ignoreQueryPrefix: true});

// sending username to server
socket.emit("userJoin", username);

// handling entering/leaving of users
socket.on("updateUsers", (users) => {
  usersList.innerHTML = "";
  for(let i=0; i<users.length; i++){
    const li = document.createElement("li");
    li.innerHTML = `${users[i].username}`;
    document.querySelector(".users-name").appendChild(li);
  }
});

// listening to message from server and adding it in chatbox
socket.on('message', msg=>{
  const div = document.createElement('div');
  div.innerHTML = 
  `
  <p class="meta">${msg.username}</p>
  <p class="text">${msg.message}</p>
  `;
  div.classList.add("message");
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
})

// listening to message send in the chat box
chatForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  socket.emit('chatMessage', {username: username, message: inputField.value });
  inputField.value = "";
})

