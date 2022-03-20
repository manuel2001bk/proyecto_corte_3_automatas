var sentencia = ''
var entrada = []

const updateValue = (e) => {
    sentencia = e.target.value;
    console.log(sentencia)
}

document.getElementById('codigo').addEventListener('change', updateValue, false);

document.getElementById('ingresar').addEventListener('click', getValueInput, false);

function getValueInput() {
    if (verificar()) {
        entrada = sentencia.split(" ")
        console.log(entrada)
    }
}

function verificar() {
    if (sentencia.length > 1) {
        return true

    }
    else {
        errors(1)
        return false
    }
}

const errors = (tipo) => {
    switch (tipo) {
        case 1:
            alert("Ingresa una sentencia")
            break;
        case 2:
            alert("Pais no encontrado")
            break;
        case 3:
            alert("El codigo de la empresa es incorrecto")
            break;
        case 4:
            alert("El numero del producto es incorrecto")
            break;
        default:
            alert("Imposible poder validar el codigo")
            break;
    }
    document.getElementById('codigo').value = ''
}