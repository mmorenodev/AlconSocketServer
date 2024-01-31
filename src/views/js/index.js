const socket = io();

socket.on("welcome", data => {
    const text = document.querySelector("#text");
    text.textContent = data;
})

const emitToServer = document.querySelector("#emit-to-server");
emitToServer.addEventListener("click", () => {

    socket.emit("server", "Hola, servidor 👀");

});

socket.on("lee_peso_en_bascula", message => {

    console.log("Leyendo peso en bascula " + message);

});
