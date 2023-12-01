const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: "http://localhost:8069", // Ajusta esto según sea necesario
        methods: ["GET", "POST"]
    }
});

app.use( express.static(path.join(__dirname, "views")) );

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", socket => {

    // Emisión básica
    socket.emit("welcome", "Ahora estás conectado 😎.");

    socket.on("server", data => {
        console.log(data);
    });

    socket.on("lee_peso_bascula", message => {

        console.log(message);
        socket.emit("peso_leido","120 KG");
    
    });

    // Emisión a todos
    io.emit("everyone", socket.id + " se ha conectado 👀");

});

httpServer.listen(3000);