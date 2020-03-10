let socket = io.connect("http://localhost:3000", { "forceNew": true });

var message;
var valOferta = 0;

socket.on('ofertas', data => {
    this.render(data).then();
});

socket.on('bloquear', data => {
    bloquearTodo(data).then();
});

function render(data) {
    return new Promise(
        (resolve, reject) => {
            let html = data.map((e, i) => {
                var resp = ``
                if (e.oferta) {
                    resp = ` <div>
                    <p> ${e.razonsocial}[<strong>Oferta aceptada. Valor: ${e.valor}</strong>]</p>
                    </div>  `
                    valOferta = e.valor
                }
                else {
                    resp = `<p>${e.razonsocial}[Oferta no aceptada]</p>`
                    valOferta = e.valor
                }
                return (resp);
            }).join(" ");
            resolve()

            document.getElementById("ofertas").innerHTML = html;
        }
    );

}

function addInsc() {
    this.message = {
        nit: document.getElementById("nit").value,
        razonsocial: document.getElementById("razonsocial").value,
        oferta: false,
        valor: 0
    };


    frm = document.forms['registro'];
    for (i = 0; ele = frm.elements[i]; i++) {
        ele.disabled = true;
    }
    console.log(this.message)
    document.getElementById("nit").value=''
    document.getElementById("razonsocial").value=''
    document.getElementById("btnoffer").disabled = false;
    return false;
}

function sendOferta() {

    console.log("Emitting new message");
    bloquear(this.message).then(data => socket.emit('new-ofert', data));
}
async function bloquear(data) {

    // mensaje que bloquee a los demas
    data.valor = valorOferta();
    socket.emit('bloquear', true)


    const timeOut = await new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 30000)
    });;
    let PB = pb()
    let PO = pb()
    console.log(`${PO} pb: ${PB}`)
    if (PO > PB) {
        data.oferta = true;
        document.getElementById("btnoffer").disabled = true;
    } else {
        document.getElementById("btnoffer").disabled = false;
        socket.emit("bloquear", false)
    }
    console.log("Termino bloqueo")
    return (data)

}

function bloquearTodo(accion) {
    return new Promise((resolve, reject) => {
        console.log("Bloqueando")
        document.getElementById("btnoffer").disabled = accion;
        resolve()
    }


    )

}
function valorOferta() {
    if (this.valOferta === 0) {
        return 150000000;
    }
    else {
        return ((Math.floor((10000000 - 5000000) * Math.random())) + valOferta);
    }

}

function pb() {

    return (Math.floor((0,3 - 0,8) * Math.random()))
}
