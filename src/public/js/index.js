console.log("Debemos conservar el equilibrio del poder!!! muuuuahahahah")

const socket = io()

socket.emit("messaje", "Hola para todos")

socket.on("saludo", (data) => {
    console.log(data)
})