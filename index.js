var player;
function setVideo(id) {
  let ele = document.getElementById("youtubeas");
  let parent = ele.parentElement;
  ele.remove();
  let child = document.createElement('div');
  child.setAttribute('id', 'youtubeas')
  parent.appendChild(child)
  player = new YT.Player('youtubeas', {
    width: '50%',
    height: '50%',
    videoId: id,
    playerVars: {
      'playsinline': 1
    }
  });
}


const card = document.getElementsByClassName('card')[0]
const text = document.getElementsByClassName('text')[0]

const curry = (fun, input) => () => fun(input, input);
const setText = (txt) => {
  text.textContent = txt;
  let ele = document.getElementById("youtubeas");
  let parent = ele.parentElement;
  ele.remove();
  let child = document.createElement('div');
  child.setAttribute('id', 'youtubeas')
  parent.appendChild(child)
}


card.addEventListener("click", () => {socket.emit("click")})

socket.on("text", setText);


let content = document.getElementById('youtube');
let button = document.getElementById('yb');

button.addEventListener("click", () => {socket.emit("play", content.value.trim())})

socket.on("play", setVideo)
