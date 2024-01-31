const express = require("express");
const cors = require("cors");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
app.use(cors());
app.use( express.static(path.join(__dirname, "views")) );

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", socket => {
    console.log(`Cliente conectado: ${socket.id}`);
    // Emisión básica
    socket.emit("welcome", "Ahora estás conectado 😎.");

    socket.on("server", data => {
        console.log(data);
        io.emit("ping", "ping desde el server")
    });

    socket.on("lee_peso", data => {
        console.log("LEE PESO EN BASCULA");
        console.log(data);
        // Emitir a todos los clientes
        io.emit("lee_peso", "Leer Peso Bascula")
    
    });

    socket.on("peso_leido", data => {
        console.log("PESO LEIDO EN BASCULA");
        console.log(data);
        io.emit("peso_leido", data)
    });



    // Emisión a todos
    io.emit("everyone", socket.id + " se ha conectado 👀");
});


httpServer.listen(process.env.PORT || 3000);
