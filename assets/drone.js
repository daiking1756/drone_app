const socket = io();
const log = document.getElementById('log');
const form = document.forms.myExtraController;
const controller = document.forms.myController
const x = document.getElementById("x");
const y = document.getElementById("y");
const div_x = document.getElementById("div-x")
const div_y = document.getElementById("div-y")
const mode_checkbox = document.getElementsByTagName('input')[0];
// mode_checkbox.onchange = changeBtnInnerHTML();

$(div_y).toggle()

function changeBtnInnerHTML(){
  // console.log("checkbox chanaged!");
  $(div_x).toggle()
  $(div_y).toggle()

  if (mode_checkbox.checked) {

    document.getElementsByTagName('button').up.innerHTML = "CLOCKWISE"
    document.getElementsByTagName('button').down.innerHTML = "COUNTER CLOCKWISE"
    document.getElementsByTagName('button').forward.innerHTML = "FLIP FORWARD"
    document.getElementsByTagName('button').back.innerHTML = "FLIP BACK"
    document.getElementsByTagName('button').right.innerHTML = "FLIP RIGHT"
    document.getElementsByTagName('button').left.innerHTML = "FLIP LEFT"
  } else {
    document.getElementsByTagName('button').up.innerHTML = "UP"
    document.getElementsByTagName('button').down.innerHTML = "DOWN"
    document.getElementsByTagName('button').forward.innerHTML = "FORWARD"
    document.getElementsByTagName('button').back.innerHTML = "BACK"
    document.getElementsByTagName('button').right.innerHTML = "RIGHT"
    document.getElementsByTagName('button').left.innerHTML = "LEFT"

  }
}

form.btn.addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit('cmdRaw', form.text.value);
  form.text.value = '';
})

x.addEventListener('change', function(e){
  e.preventDefault();
  socket.emit('x', x.value);
})

y.addEventListener('change', function(e){
  e.preventDefault();
  socket.emit('y', y.value);
})


controller.takeoff.addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit('cmd', "takeoff");
})

controller.land.addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit('cmd', "land");
})

controller.up.addEventListener('click', function(e) {
  e.preventDefault();
  if (mode_checkbox.checked) {
    socket.emit('cmd', "cw");
  } else {
    socket.emit('cmd', "up");
  }
})

controller.down.addEventListener('click', function(e) {
  e.preventDefault();
  if (mode_checkbox.checked) {
    socket.emit('cmd', "ccw");
  } else {
    socket.emit('cmd', "down");
  }
})

controller.forward.addEventListener('click', function(e) {
  e.preventDefault();
  if (mode_checkbox.checked) {
    socket.emit('cmd', "flip f");
  } else {
    socket.emit('cmd', "forward");
  }
})

controller.back.addEventListener('click', function(e) {
  e.preventDefault();
  if (mode_checkbox.checked) {
    socket.emit('cmd', "flip b");
  } else {
    socket.emit('cmd', "back");
  }
})

controller.right.addEventListener('click', function(e) {
  e.preventDefault();
  if (mode_checkbox.checked) {
    socket.emit('cmd', "flip r");
  } else {
    socket.emit('cmd', "right");
  }
})

controller.left.addEventListener('click', function(e) {
  e.preventDefault();
  if (mode_checkbox.checked) {
    socket.emit('cmd', "flip l");
  } else {
    socket.emit('cmd', "left");
  }
})



socket.on('chat', function(msg){
  // play SE
  const audioElem = new Audio();
  if(msg == 'takeoff' || msg == 'land') {
    audioElem.src = "/sounds/takeoff_land.mp3";
  } else {
    audioElem.src = "/sounds/detect_gesture.mp3";
  }
  audioElem.play();

  const li = document.createElement('li');

  li.textContent = `[${log.childElementCount + 1}] ${msg}`;
  // log.appendChild(li);
  log.insertBefore(li, log.firstChild);
});
