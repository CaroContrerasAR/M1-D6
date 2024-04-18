const socket = io() //cliente Socket.IO

const message = document.getElementById('message')
const received_message = document.getElementById('received_message')

const users = [
    { id:1 , firstName:"Carlos", lastName:"Baute", userName:"cbaute"},
    { id:2 , firstName:"Carolina", lastName:"Ferrero", userName:"cferrero"},
    { id:3 , firstName:"Juan", lastName:"Perez", userName:"jperez"}
]

let user = ''

socket.on('user_connected', data => {
    Swal.fire({
        text:`${data.user.firstName} ${data.user.lastName} se ha conectado!`,
        toast: true,
        position:'top-right'
    })
})
        
// messageLogs emitido por el servidor, el cliente escucha y actualiza la lista de mensajes
socket.on('messagesLogs', data => {
    let messages = ''
    data.forEach(message => {
    messages += `[${message.user.userName}] ${message.message}<br/>`
    })
    received_message.innerHTML = messages
})
        
const sendMessage = () => {
    if(message.value.trim() !== ''){
        socket.emit('message',{user: user, message: message.value.trim()})
        message.value = ''
    }
}
console.log('servidor conectado ok')

const authenticate = () => {
    Swal.fire({
        title:"Login",
        input:"text",
        text:"Ingresar Usuario",
        inputValidator:(value)=>{
            return!value && `Por favor ingrese el usuario!`
        },
        allowOutsideClick:"false"
    }).then(res=>{
        //user = res.value  
        user = users.find(item=> item.userName === res.value)
        if(user !== undefined){
            socket.emit('user_connected', { user: user })
        } else {
            Swal.fire({
                text:"Usuario no valido",
                toast: true,
                position:'top-right'
            }).then(res=>{
                authenticate()
                })
        }
        console.log(`Se conecto ${user.firstName} ${user.lastName}`)
    })
}

authenticate()