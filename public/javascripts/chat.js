let username = localStorage.getItem('username')
if (username == null) {
    username = prompt('Ingrese username')
    localStorage.setItem('username', username)
}

if (username) {
    document.getElementById('username').innerHTML = `Welcome ${username}`
}

const btn = document.getElementById('load')
const btnSend = document.getElementById('send')
const socket = io()

btn.onclick = e => {
    e.preventDefault() 
    console.log('prueba de click load')
    const name = document.getElementById("name").value
    const price = document.getElementById("price").value
    const thumbnail = document.getElementById("thumbnail").value
    socket.emit('add', {name, price, thumbnail, username})
}

btnSend.onclick = e => {
    e.preventDefault() 

    const email = document.getElementById("email").value
    const authorName = document.getElementById("authorName").value
    const authorLastName = document.getElementById("authorLastName").value
    const age = document.getElementById("age").value
    const alias = document.getElementById("alias").value
    const avatar = document.getElementById("avatar").value
    const msn = document.getElementById("msn").value

    socket.emit('chat-in', { 
        email,
        authorName,
        authorLastName,
        age,
        alias,
        avatar,
        msn})
}

socket.on('show', products => {
    // console.log(products)

    fetch('/api/products')
        .then(r => r.text())
        .then(html => {
            const div = document.getElementById("products")
            div.innerHTML = html
        })
        .catch(e => alert(e))
    
})

socket.on('chat-out', () => {
    fetch('/api/chat/')
        .then(r => r.text())
        .then(html => {
            console.log("chat-out",html)
            const div = document.getElementById("chat")
            div.innerHTML = html
        })
        .catch(e => alert(e))
})