const socket = io()

socket.on("products", (data) => {
    renderProducts(data)
})

const renderProducts = (products) => {
    const containerProducts = document.getElementById("containerProducts")
    containerProducts.innerHTML = "";
    

    products.forEach(item => {
        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
        <p>Id ${item.id}</p>
        <p>Titulo ${item.title}</p>
        <p>Precio ${item.price}</p>
        <button class="btnEliminar"> Eliminar </button>
        `
        containerProducts.appendChild(card)
        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id)
        })
    });
}

const deleteProduct = (id) => {
    socket.emit("deleteProduct", id)
}

document.getElementById("btnSend").addEventListener("click", () => {
    addProduct()
})

const addProduct = () => {
    const product = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            img: document.getElementById("img").value,
            code: document.getElementById("code").value,
            stock: document.getElementById("stock").value,
            status: document.getElementById("status").value === "true"
        };
        socket.emit("addProduct", product)
}

//chat

let user
const chatBox = document.getElementById("chatBox")

swal.fire({
    title: "Como te llamas?",
    input: "text",
    Text: "Ingresa nombre de usuario que se mostrara en el chat",
    inputValidator: (value) => {
        return !value && "Necesita ingresar un nombre para continuar"
    },
    allowOutsideClick: false,
}).then( result => {
    user = result.value
})

chatBox.addEventListener("keyup", (event) => {
    if(event === "Enter") {
        if(chatBox.value.trim().length > 0) {
            socket.emit("messages", {user: user, messages: chatBox.value})
            chatBox.value = ""
        }
    }
})

//Listener de mensajes

socket.on("messages", data => {
    let log = documen.getElementById("messagesLogs")
    let messages = ""

    data.forEach( messages =>{
        messages = messages + `${messages.user} dice: ${messages.messages} <br>`
    })

    log.innerHTML = messages
})