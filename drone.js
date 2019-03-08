"use strict"

const dgram = require("dgram")
const sock = dgram.createSocket("udp4")

// Telloの固定情報
const tello = {
    ip: "192.168.10.1",
    port: 8889
}

// Telloにコマンド送信する関数
const send = async (buf, ms = 0) => {
    console.log(buf)
    const command = new Buffer(buf)
    sock.send(command, 0, command.length, tello.port, tello.ip)
    await wait(ms)
}
const wait = ms => new Promise(res => setTimeout(res, ms))

// Telloに操作したいコマンドを記述
const main = async () => {
    await send("command", 100)
    await send("takeoff", 4000)
    await send("land")
    // await send(cmd, time)

    process.exit()
}
main()
// main("command", 100)
// main("takeoff", 2000)
// main("land", 100)
