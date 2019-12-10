var uuid={};
    uuid["UART_SERVICE"]                 ='6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    uuid["UART_SERVICE_CHARACTERISTICS"] ='6e400002-b5a3-f393-e0a9-e50e24dcca9e';

document.getElementById('connect').addEventListener('click', function(e) {
  e.preventDefault();
  connect();
})
document.getElementById('disconnect').addEventListener('click', function(e) {
  e.preventDefault();
  disconnect();
})

function connect(){
    navigator.bluetooth.requestDevice({
        filters: [{
            namePrefix: 'BBC micro:bit',
        }],
        optionalServices: [uuid["UART_SERVICE"]]
    })
    .then(device => {
        uart_device=device;
        console.log("device", device);
        return device.gatt.connect();
    })
    .then(server => {
        console.log("server", server)
        return server.getPrimaryService(uuid["UART_SERVICE"]);
    })
    .then(service => {
        console.log("service", service)
        return service.getCharacteristic(uuid["UART_SERVICE_CHARACTERISTICS"]);
    })
    .then(chara => {
        console.log("UART:", chara)
        alert("BLE connected");
        characteristic=chara;
        characteristic.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged',onCharacteristicValueChanged);
    })
    .catch(error => {
        alert("BLE error");
        console.log(error)
    });
}

function onCharacteristicValueChanged(e) {
    var str_arr=[];
    for(var i=0;i<this.value.byteLength;i++){
        str_arr[i]=this.value.getUint8(i);
    }
    var str=String.fromCharCode.apply(null,str_arr);
    // alert("msg:"+str);
    // socket.emit('chat', str);
    if(str=="takeoff") {
        socket.emit('cmd', "takeoff");
    } else if(str=="land") {
        socket.emit('cmd', "land");
    } else if(str=="up") {
        if (mode_checkbox.checked) {
            socket.emit('cmd', "cw");
        } else {
            socket.emit('cmd', "up");
        }
    } else if(str=="down") {
        if (mode_checkbox.checked) {
            socket.emit('cmd', "ccw");
        } else {
            socket.emit('cmd', "down");
        }
    } else if(str=="forward") {
        if (mode_checkbox.checked) {
            socket.emit('cmd', "flip f");
        } else {
            socket.emit('cmd', "forward");
        }
    } else if(str=="back") {
        if (mode_checkbox.checked) {
            socket.emit('cmd', "flip b");
        } else {
            socket.emit('cmd', "back");
        }
    } else if(str=="right") {
        if (mode_checkbox.checked) {
            socket.emit('cmd', "flip r");
        } else {
            socket.emit('cmd', "right");
        }
    } else if(str=="left") {
        if (mode_checkbox.checked) {
            socket.emit('cmd', "flip l");
        } else {
            socket.emit('cmd', "left");
        }
    }
}

function disconnect() {
    if((!uart_device)||(!uart_device.gatt.connected)){
        return;
    }else{
        uart_device.gatt.disconnect();
        alert("BLE disconnected");
    }
}
