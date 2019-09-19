# Tello Drone Controller
This is a controller for toy drone Tello

<img width="468" alt="drone_app" src="https://user-images.githubusercontent.com/21329786/54018551-54010e80-41cc-11e9-8529-e5c2743b86de.png">

# Abstract
This is a controller of your Tello.
There are two methods to controll your Tello.

# Setting
1. Connect the Tello Wi-Fi
2. Run server `node server.js`
3. Access `localhost:3000` on your browser
4. If you use micro:bit, turn on bluetooth and, click CONNECT Button

# Button and command
You can controll your tello by some Buttons and TextBox.

## Button
- TAKEOFF
- LAND
- UP
- DOWN
- FORWARD
- BACK
- RIGHT
- LEFT

## TextBox
- distance x[cm] -> Setting the moving distance
- other command -> Sending any command such as flip back, clockwise turn, counter clockwise turn, and so on

# micro:bit
You can connect your micro:bit.
When you tilt your micro:bit, your Tello will move in that direction.

## How to Use 
- TAKEOFF -> Push A Button when your Tello is not flying
- LAND -> Push A Button when your Tello is flying
- UP -> Tilt Up
- DOWN -> Tilt Down
- FORWARD -> Tilt Up + Push B Button
- BACK -> Tilt Down + Push B Button
- RIGHT -> Tilt Right
- LEFT -> Tilt Left