class Stack {
    constructor() {
        this.stack = []
    }
    push(element) {
        this.stack.push(element);
        return this.stack;
    }
    pop() {
        return this.stack.pop();
    }
    peek() {
        return this.stack[this.stack.length]
    }
    size() {
        return this.stack.length;
    }
    print() {
        console.log(this.stack)
    }
}

const stack = new Stack()
var sentencia = ''
var entrada = []

var reglas = [{
    'estado': 'S',
    'regla': ['FINAL','MEDIO','INICIO'],
    'alfabeto' : '',
    'final':false
}, {
    'estado': 'INICIO',
    'regla': ['INTO','INSERT'],
    'alfabeto' : '',
    'final':false
},{
    'estado': 'MEDIO',
    'regla': ['Y','PN'],
    'alfabeto' : '',
    'final':false
},{
    'estado': 'FINAL',
    'regla': ['VAL','PF'],
    'alfabeto' : '',
    'final':false
},{
    'estado': 'INSERT',
    'regla': [],
    'alfabeto' : 'INSERT',
    'final':true
},{
    'estado': 'INTO',
    'regla': [],
    'alfabeto' : 'INTO',
    'final':true
},{
    'estado': 'PN',
    'regla': ['L'],
    'alfabeto' : '',
    'final':false
},{
    'estado': 'L',
    'regla': [],
    'alfabeto' : 'a-zA-Z',
    'final':true
},{
    'estado': 'Y',
    'regla': ['PC','VACIO'],
    'alfabeto' : 'no',
    'final':true
},{
    'estado': 'VACIO',
    'regla': [],
    'alfabeto' : '',
    'final':true
},{
    'estado': 'PC',
    'regla': ['CP','COL','PI'],
    'alfabeto' : '',
    'final':false
},{
    'estado': 'PI',
    'regla': [],
    'alfabeto' : '(',
    'final':true
},{
    'estado': 'CP',
    'regla': [],
    'alfabeto' : ')',
    'final':true
},{
    'estado': 'COL',
    'regla': ['VACIO','PC'],
    'alfabeto' : 'cadenas',
    'final':true
},{
    'estado': 'PF',
    'regla': ['VALUES','SET'],
    'alfabeto' : 'pf',
    'final':true
},{
    'estado': 'VAL',
    'regla': ['CP','Z','PI'],
    'alfabeto' : '',
    'final':false
},{
    'estado': 'Z',
    'regla': [],
    'alfabeto' : 'valores',
    'final':true
}
]

// {
//     'estado': 'VALUES',
//     'regla': [],
//     'alfabeto' : 'VALUES',
//     'final':true
// },{
//     'estado': 'SET',
//     'regla': [],
//     'alfabeto' : 'SET',
//     'final':true
// },
const updateValue = (e) => {
    sentencia = e.target.value;
    console.log(sentencia)
}

document.getElementById('codigo').addEventListener('change', updateValue, false);

document.getElementById('ingresar').addEventListener('click', getValueInput, false);

function getValueInput() {
    if (verificar()) {
        if (desgloce()) {
            stack.push(reglas[0])
            evalua_entrada()
        }
    }
}

function evalua_entrada  ()  {
    console.log("Contenido de la pila",stack.print())
    let apuntador = 0
    let aux
    do {
        aux = stack.pop()
        console.log("Entrada a la evaluacion")
        console.log("Estado: ",aux.estado)
        console.log("Final: ",aux.final)
        if(aux.final){
            console.log("Es terminal")
            switch (aux.alfabeto) {
                case 'a-zA-Z':
                    if(eval_Cadena(entrada[apuntador])){
                        console.log("Es correcto")
                        apuntador++
                    }else{
                        alert("Cadena no valida")
                    }
                    break;
                case 'no':
                    eval_Cadena_columnas(apuntador,aux)
                    break;
                case '(':
                    let aux_cad = entrada[apuntador]
                    aux_cad = aux_cad[0]
                    
                    console.log(aux_cad == aux.alfabeto)
                    console.log(aux_cad)
                    if(aux_cad == aux.alfabeto){
                        console.log("Cadena correcta")
                    }
                    else{
                        alert("Cadena Incorrecta")
                        apuntador = -1
                    }
                    break;
                case ')':
                    let aux_cade = entrada[apuntador-1]
                    aux_cade = aux_cade[aux_cade.length-1]
                    console.log(aux_cade)
                    if(aux_cade == aux.alfabeto){
                        console.log("Cadena correcta")
                    }
                    else{
                        alert("Cadena Incorrecta")
                        apuntador = -1
                    }
                    break;
                case 'cadenas':
                    let cadena = entrada[apuntador]
                    if(eval_Cadena_data(cadena.substring(1, cadena.length-1))){
                        apuntador++
                    }else{
                        errors(2)

                    }
                    break;
                case 'valores':
                    let valor = entrada[apuntador]
                    if(eval_Cadena_values(valor.substring(1, valor.length-1))){
                        console.log("Correcto")
                        apuntador++
                    }else{
                        errors(2)

                    }
                    break;
                case 'pf':
                    if(aux.regla[0] == entrada[apuntador]){
                        console.log('Cadena aceptada')
                        apuntador++
                    }
                    else{
                        if(aux.regla[1] == entrada[apuntador]){
                            console.log('Cadena aceptada')
                            apuntador++
                        }else{
                            console.log("Cadena no valida", entrada[apuntador])
                        }
                    }
                    break;
            
                default:
                    if(entrada[apuntador] == aux.alfabeto){
                        console.log("Es correcto")
                        apuntador++
                    }else{
                        
                    }
                    break;
            }
        }
        else{
            if(aux.reglas != ''){
                for (const x in aux.regla) {
                    console.log(aux.regla[x])
                    for (let index = 0; index < reglas.length; index++) {
                        if(reglas[index].estado === aux.regla[x]){
                            console.log("SE REGISTRO" ,reglas[index])
                            stack.push(reglas[index])
                        }
                    }
                }
            }else{
                alert("Error al intentar buscar las reglas")
            }
        }
        stack.print()
    } while (stack.size() != 0);
    apuntador++
    if(stack.size != 0  && apuntador >= entrada.length){
        alert("Cadena aceptada")
    }else{
        alert("Cadena no valida")
    }
}

function desgloce() {
    entrada = sentencia.split(" ")
    console.log(entrada)
    return true
}

function eval_Cadena(cadena) {
    let exp_reg = /[a-z A-Z]/

    for (x = 0; x < cadena.length; x++) {
        if (exp_reg.test(cadena[x])) {
            console.log("Cadena correcta", cadena[x])
        }
        else {
            errors(2)
            return false
        }
    }
    return true
}
function eval_Cadena_columnas(apuntador,aux) {
    let comparador = entrada[apuntador]
    console.log("Palabra a evaluar : ", comparador[0])
    if(comparador[0] == '('){
        console.log(aux.regla[0])
        for (let index = 0; index < reglas.length; index++) {
            if(reglas[index].estado === aux.regla[0]){
                console.log("SE REGISTRO" ,reglas[index])
                stack.push(reglas[index])
            }
        }
        return true
    }else{
        console.log("Correcto vacio")
        console.log("Siguente comparacion")
        return false
    }
}

function eval_Cadena_data(cadena) {
    cadena = cadena.split(',')
    console.log("Columnas : " ,cadena)
    for (const key in cadena) {
        if(eval_Cadena(cadena[key])){
            console.log("Columna correcta")
        }else{
            console.log("Columnas in correctas")
            return false
        }
    }
    return true
    
}
function eval_Cadena_values(cadena) {
    cadena = cadena.split(',')
    console.log("Columnas : " ,cadena)
    for (const key in cadena) {
        if(eval_Cadena(cadena[key].substring(1,cadena[key].length-1))){
            console.log("Columna correcta")
        }else{
            console.log("Columnas in correctas")
            return false
        }
    }
    return true
    
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
            alert("Esta cadena no es valida")
            break;
        case 3:
            alert("La cadena no es valida en el bloque 1")
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
