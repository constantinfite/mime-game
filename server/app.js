const Express = require("express");
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

Socketio.on("connection", socket => {
    socket.emit("position")
})

Http.listen(4000, () => {
    console.log("Listening at :4000");
});