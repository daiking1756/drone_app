const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
let x = 30;
let y = 90;
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/assets/index.html");
});
app.use(express.static("assets"));

server.listen(3000);

// "use strict"

const dgram = require("dgram");
const sock = dgram.createSocket("udp4");

// Telloの固定情報
const tello = {
  ip: "192.168.10.1",
  port: 8889,
};

// Telloにコマンド送信する関数
const send = async (buf, ms = 0) => {
  console.log(buf);
  const command = Buffer.from(buf);
  sock.send(command, 0, command.length, tello.port, tello.ip);
  await wait(ms);
};
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

// Telloに操作したいコマンドを記述
const main = async (cmd) => {
  await send(cmd, 500);
};
// main()

send("command", 500); // entry sdk mode

io.on("connection", function (socket) {
  //ここに処理を記述する
  socket.on("chat", function (msg) {
    console.log(msg);
    io.emit("chat", msg);
  });

  socket.on("x", function (msg) {
    let res = "distance x: " + x + " -> " + msg;
    console.log(res);
    x = Number(msg);
    io.emit("chat", res);
  });

  socket.on("y", function (msg) {
    let res = "angle y: " + y + " -> " + msg;
    console.log(res);
    y = Number(msg);
    io.emit("chat", res);
  });

  socket.on("cmd", function (msg) {
    let cmd = msg;
    if (msg == "up" || msg == "down" || msg == "forward" || msg == "back" || msg == "right" || msg == "left") {
      cmd += " " + x;
    } else if (msg == "cw" || msg == "ccw") {
      cmd += " " + y;
    }
    io.emit("chat", cmd);
    send(cmd, 500); // 0.5秒待つ
  });

  socket.on("cmdRaw", function (msg) {
    const cmd = msg;
    io.emit("chat", cmd);
    send(cmd, 500); // 0.5秒待つ
  });
});
