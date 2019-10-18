var socket = io();
var log = document.getElementById('log');
var form = document.forms.myform;
var controller = document.forms.mycontroller
var x = document.getElementById("x");

form.btn.addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit('cmdRaw', form.text.value);
  form.text.value = '';
})

x.addEventListener('change', function(e){
  e.preventDefault();
  socket.emit('x', x.value);
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
  socket.emit('cmd', "up");
})

controller.down.addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit('cmd', "down");
})

controller.forward.addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit('cmd', "forward");
})

controller.back.addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit('cmd', "back");
})

controller.right.addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit('cmd', "right");
})

controller.left.addEventListener('click', function(e) {
  e.preventDefault();
  socket.emit('cmd', "left");
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
