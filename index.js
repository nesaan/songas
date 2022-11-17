const card = document.getElementsByClassName('card')[0]
const text = document.getElementsByClassName('text')[0]

const curry = (fun, input) => () => fun(input, input);
const setText = (txt) => text.textContent = txt;


card.addEventListener("click", () => {socket.emit("click")})

socket.on("text", setText);
