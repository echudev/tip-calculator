
//Declaro variables tomando valores del DOM
var cuenta = document.getElementById('billinput');//input Cuenta a pagar
var cantidadPersonas = document.getElementById('pplinput');//input cantidad personas
var customInput = document.getElementById('custom');//input propina definida por el usuario
var radioTip = document.getElementsByName('radioTip');//inputs predefinidos de propina (5% a 50%)
var tipGrid = document.getElementById('gridContainer')//contenedor de inputs predefinidos
var pplContainer = document.getElementById('ppl-container');//Contenedor input "cantidad personas"
var warningLabel = document.getElementById('ppl-warning');//Label "warning" si peronas<1
var resetBtn = document.getElementById('reset')//Botton Resetear
var propPersona = document.getElementById('propiPorPersona')//display propina por persona
var totalPersona = document.getElementById('totalPersona')//display total $$ por persona



//----------FUNCIONES--------------------------------------------//

//Reset "Custom input" (ejecuto la función con un "onclick" desde HTML)
var resetCustom = () => customInput.value = "";

//función devuelve True si al menos un input de propina está activo
var radioChecker = function () {
    for (let n in radioTip) {
        if (radioTip[n].checked) {
            return true
        }
    }
    if (customInput.value != "") {
        return true
    }
    return false
}

//habilita/deshabilita botón reset al insertar input en "cuenta"
var resetEnabler = function () {
    var isTipSelected = radioChecker()
    if (cuenta.value != "" || cantidadPersonas.value != "" || isTipSelected == true) {
        resetBtn.disabled = false;
    } else {
        resetBtn.disabled = true;
    }
}

//Reinicia todos los inputs (ejecuto la función desde "onclick" en HTML al button reset)
var resetAll = function () {
    for (let n in radioTip) {
        radioTip[n].checked = false;
    }
    customInput.value = "";
    cuenta.value = "";
    cantidadPersonas.value = "";
    resetBtn.disabled = true;
    propPersona.innerText = '$0'
    totalPersona.innerText = '$0';
    warningLabel.style.display = 'none'
}

//Función principal de la app
//Calcula propina por persona y el total a pagar por persona
var calculador = function () {
    let tip = 0;
    let ppl = cantidadPersonas.value
   
    //recorro los input radius, tomo el valor del que esté seleccionado
    for (let n in radioTip) {
        if (radioTip[n].checked) {
            tip = radioTip[n].value
        }
    }
     //en caso de que el usuario seleccione el "custom tip", se "uncheckean" los radio input (ver eventListener mas abajo) y tomo el valor del custom
     let customTip = customInput.value * 0.01 

    //muestro en pantalla el resultado final
    if (ppl >= 1 && tip>0) {
        let propina = (cuenta.value * tip) / ppl;
        let total = (cuenta.value / ppl) + propina;
        propPersona.innerText = '$' + propina.toFixed(2);
        totalPersona.innerText = '$' + total.toFixed(2);
    }else if(ppl >= 1 && customTip>0){
        let propina = (cuenta.value * customTip) / ppl;
        let total = (cuenta.value / ppl) + propina;
        propPersona.innerText = '$' + propina.toFixed(2);
        totalPersona.innerText = '$' + total.toFixed();
    }
}


//-------------------------EVENTLISTENERS-------------------------------//

cuenta.addEventListener("input", () => resetEnabler());
cuenta.addEventListener("input", () => calculador());

pplContainer.addEventListener("input", () => resetEnabler());
pplContainer.addEventListener("input", () => calculador());

tipGrid.addEventListener("change", () => resetEnabler());
tipGrid.addEventListener("change", () => calculador());

customInput.addEventListener("input", () => calculador());
//uncheck all radio inputs when click/touch the custom input
customInput.addEventListener("focus", function () {
    for (let n in radioTip) {
        radioTip[n].checked = false;
    }
    resetEnabler();
})




//Bordes del input "cantidad de personas" al hacer focusin y focusuot
cantidadPersonas.addEventListener("focusin", ()=> {
    pplContainer.style.border = 'solid 2px var(--StrongCyan)'
})
cantidadPersonas.addEventListener("focusout", function () {
    pplContainer.style.border = 'hidden'
})

//Cambia aspecto del input "personas", si el input es menor o igual a 1(uno)
cantidadPersonas.addEventListener("input", function () {
    if (cantidadPersonas.value < 1) {
        warningLabel.style.display = 'block';
        pplContainer.style.border = 'solid 2px var(--Warning)'
    } else if (cantidadPersonas.value >= 1) {
        warningLabel.style.display = 'none'
        pplContainer.style.border = 'solid 2px var(--StrongCyan)'
    }
})

