const socket = io();

async function addMessage(e) {
    const date = new Date()
    const mensaje = {
        email: document.getElementById('email').value,
        text: document.getElementById('texto').value,
        date: date
    }

    socket.emit('nuevoMensaje', mensaje);
    return false;
}

function makeHTML(mensajes) {
    return mensajes.map((elem, index) => {
        return (`<div>
            <strong>${elem.email}</strong>:
            <em>${elem.text}</em> <br>
            <i>${elem.date}</i> </div>`)
    }).join(" ")
}


function render(mensajes) {
    const html = makeHTML(mensajes)
    document.getElementById('mensajes').innerHTML = html;
}



socket.on('mensajes', mensajes => {
    render(mensajes)
});
