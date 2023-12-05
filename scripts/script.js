//Defino Arrays con valores para hacer los Objetos de forma random
var sectors = [
    "Todas las areas",
    "Línea 1",
    "Línea 2",
    "Línea 3 Extracción",
    "Línea 3A Preparación",
    "Línea 3B Preparación",
    "Línea 3AB Preparación",
    "Caldera 2",
    "Caldera 3",
    "Caldera 4",
    "Caldera Comunes",
    "Energía",
    "Fermentación",
    "Logística",
    "Planta de Agua",
    "Planta de Ósmosis",
    "Puerto",
    "Storage"
];

var tipos_motores = [
    "DC Shunt",
    "DC Series",
    "PMDC",
    "DC Compound",
    "AC Induction",
    "Synchronous"
];

var tipos_instrumentos = [
    "FT",
    "IT",
    "PT"
];

var potencias = [
    "10 HP",
    "25 HP",
    "50 HP",
    "100 HP"
];

var fabricantes = [
    "Rockwell",
    "Siemens",
    "Mitsubishi",
    "Omron",
    "ABB",
    "Honeywell"
];

// Creo un Objeto motor con 500 elementos
var motores = [];
for (var i = 1; i <= 500; i++) {
    var randomSector = sectors[Math.floor(Math.random() * sectors.length)];
    var randomTipoMotores = tipos_motores[Math.floor(Math.random() * tipos_motores.length)];
    var randomPotencias = potencias[Math.floor(Math.random() * potencias.length)]
    var randomFabricantes = fabricantes[Math.floor(Math.random() * fabricantes.length)]
    motores.push({
        tag: "Motor " + i,
        tipo: randomTipoMotores,
        potencia: randomPotencias,
        fabricante: randomFabricantes,
        sector: randomSector
    });
}


// =====================OK=======================0
var table = document.getElementById('motorTable');
var sectorDropdown = document.getElementById('sectorDropdown');
var tipoEquiposDropdown = document.getElementById('tipoEquiposDropdown');
var searchButton = document.getElementById('searchButton');
var filtrarButton = document.getElementById('filtrarButton');
var darkModeToggle = document.getElementById('darkModeToggle');
var darkModeEnabled = false;

import { AI_VARIOS_Nro_L3A } from './load_data_L3A.js';
import { AI_VARIOS_Nro_L3B } from './load_data_L3B.js';
import { AI_VARIOS_Nro_L3AB } from './load_data_L3AB.js';

let instrumentos = {
    ...AI_VARIOS_Nro_L3A,
    ...AI_VARIOS_Nro_L3B,
    ...AI_VARIOS_Nro_L3AB
}; 

//RELLENO DE TABLA
function populateTable() {
    // Limpiar la tabla
    //table.innerHTML = '<tr><th>Tag</th><th>Tipo</th><th>Potencia</th><th>Fabricante</th><th>Sector</th></tr>';
    
    // Creo variables para almacenar las opciones seleccionadas en los Dropdown
    var selectedSector = sectorDropdown.value;
    var selectedTipoEquipos = tipoEquiposDropdown.value;
    var datos;    

    if (selectedTipoEquipos === 'motores') {
        datos = motores;
    } else if (selectedTipoEquipos === 'instrumentos') {
        datos = instrumentos;

        //Preparo los encabezados de tabla
        const columnas = [];
        columnas[0] = 'Tag';
        const llaves = Object.keys(AI_VARIOS_Nro_L3A.FQT_BH_L3A);
        //console.log(llaves);
        for (const param in llaves){
            columnas.push(llaves[param]);
        }
        //console.log("Columas: " + columnas)

        // Crea la cadena HTML para los encabezados de la tabla
        const encabezadosHTML = '<tr>' + columnas.map(columna => `<th>${columna}</th>`).join('') + '</tr>';
                                                // Otra forma seria...
                                                /*let encabezadosHTML = '<tr>';
                                                for (const columna of columnas) {
                                                    encabezadosHTML += `<th>${columna}</th>`;
                                                }
                                                encabezadosHTML += '</tr>';*/

        // ----------------------------------------------------------------------------
        // Asigna la cadena HTML a la propiedad innerHTML de la tabla
        table.innerHTML = encabezadosHTML;

        let indiceFila = 0;    
        if (selectedSector === 'Todos') {
            for (const tag in instrumentos) {
                let fila;
                if (instrumentos.hasOwnProperty(tag)) {
                    const instrumento = instrumentos[tag];
                    indiceFila += 1;
                    fila = `<tr class="${indiceFila % 2 === 0 ? 'odd' : 'even'}"><td>${tag}</td>`;
                    for (const parametro in instrumento){
                        fila += `<td>${instrumento[parametro]}</td>`;
                    }
                    fila += '</tr>'; 
                    table.innerHTML += fila;
                }
            }
            indiceFila = 0;
        } else {            
            for (const tag in instrumentos) {
                let fila;
                if (instrumentos.hasOwnProperty(tag)) {                
                    const instrumento = instrumentos[tag];                   
                    if (instrumento.Sector === selectedSector){
                        indiceFila += 1;
                        fila = `<tr class="${indiceFila % 2 === 0 ? 'odd' : 'even'}"><td>${tag}</td>`;
                        for (const parametro in instrumento){
                            fila += `<td>${instrumento[parametro]}</td>`;
                        }
                        fila += '</tr>'; 
                        table.innerHTML += fila;
                    }
                }
                
            }   
            indiceFila = 0;             
        }
        
    } else {
        //datos = motores.concat(instrumentos);
        table.innerHTML = '<tr><th>Tag</th><th>-</th><th>-</th><th>-</th><th>-</th><th>-</th><th>-</th></tr>';
        alert("Seleccionar SECTOR y TIPO EQUIPOS")
    }

    /* UNA FORMMA DE RELLENAR LA TABLA...O BIEN MODIFICAR EL STRING innerHTML
    datos.forEach(function (item) {
        // Filtros
        if (selectedSector === 'Todos' || item.sector === selectedSector) {
            var row = table.insertRow(-1);
            var labelCell = row.insertCell(0);
            var typeCell = row.insertCell(1);
            var powerCell = row.insertCell(2);
            var manufacturerCell = row.insertCell(3);
            var sectorCell = row.insertCell(4);

            labelCell.innerHTML = item.tag;
            typeCell.innerHTML = item.tipo;
            powerCell.innerHTML = item.fabricante;
            manufacturerCell.innerHTML = item.fabricante;
            sectorCell.innerHTML = item.sector;
        }
    });*/    
}

//CAMBIAR A MODO OSCURO
function toggleDarkMode() {
    var stylesheetLink = document.getElementById('stylesheet-link');
    darkModeEnabled = !darkModeEnabled;

    if (darkModeEnabled) {
        // Cambiar a Modo Oscuro
        darkModeToggle.textContent = "Cambiar a Modo Claro";
        stylesheetLink.href = './css/styles-dark.css';
    } else {
        // Cambiar a Modo Claro
        darkModeToggle.textContent = "Cambiar a Modo Oscuro";
        stylesheetLink.href = './css/styles.css';
    }
}







//sectorDropdown.addEventListener('change', populateTable);
//tipoEquiposDropdown.addEventListener('change', populateTable);

// Relleno inicial de la tabla, en realidad no quiero hacerlo al comienzo
//populateTable();


function rellenarEquiposDropdown() {    
    // Creo variables para almacenar las opciones seleccionadas en los Dropdown
    var selectedTipoEquipos = tipoEquiposDropdown.value;
    var selectedSector = sectorDropdown.value;
    const dropdownEquipos = document.getElementById('EquiposDropdown');
     
    var listaDropDown;

    if (selectedTipoEquipos === 'instrumentos' && selectedSector != "Todos") {
        console.log("Entre al 1° IF de la funcion RELLENAR")
        switch(selectedSector){
            case "L3A":
                console.log("Entre al case L3A");
                listaDropDown = AI_VARIOS_Nro_L3A;
                break;
            case "L3B":
                console.log("Entre al case L3B");
                listaDropDown = AI_VARIOS_Nro_L3B;
                //hacer
                break;
            case "L3AB":
                console.log("Entre al case L3AB");
                listaDropDown = AI_VARIOS_Nro_L3AB;
                //hacer
                break;
        }
    }
    let opcionesDropDown = [];
    for (const tag in listaDropDown) {
        opcionesDropDown.push(tag);
    }
    opcionesDropDown.forEach((opcion, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion; // Puedes establecer el valor según tus necesidades
        optionElement.text = opcion;
        dropdownEquipos.appendChild(optionElement);
    })

}





/*
function setColumnWidths() {
    var table = document.getElementById("motorTable");
    var rows = table.rows;

    for (var i = 0; i < rows[0].cells.length; i++) {
        var max = 0;
        for (var j = 0; j < rows.length; j++) {
            var cell = rows[j].cells[i];
            var cellWidth = cell.scrollWidth;
            if (cellWidth > max) {
                max = cellWidth;
            }
        }
        rows[0].cells[i].style.width = max + "px";
    }
}

window.onload = setColumnWidths; */




// =============================== QR =============================== 
const urlActual = window.location.href;
console.log(urlActual);
// Crea un objeto URL
const url = new URL(urlActual);
// Obtiene el valor del parámetro 'nombre_equipo_xx'
const nombreEquipo = url.pathname.split('/').pop();
// Ahora 'nombreEquipo' contiene el valor que necesitas
console.log(nombreEquipo);

/* La siguiente parte del codigo esta pensado para cuando se accede a través de un QR */
const appDiv = document.getElementById('app');
const datosPLC = document.getElementById('datosPLC');
const datosCalibracion = document.getElementById('datosCalibracion');
const datosEquipo = document.getElementById('datosEquipo');
const datosSAP = document.getElementById('datosSAP');



function obtenerParametroDeURL(nombre) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(nombre);
}

function llenarDesdeQR() {
    const equipo = obtenerParametroDeURL('equipo');
    if (equipo != null){
        infoTag(equipo)
    } else {
        console.log("No ejecute infoTag desde QR!!!!!")
    }
}

// Llamada inicial
//llenarDesdeQR();
// ================================================================== 








// =========================== AUTOCOMPLETAR INPUT + BOTON FILTRAR =========================
let instrumentosArray = [];
for (const tag in instrumentos) {
    instrumentosArray.push(tag);
}

let inputBusqueda = document.getElementById('inputBusqueda');
const opcionesDropdown = document.getElementById('opcionesDropdown');

// Evento de entrada en la input
inputBusqueda.addEventListener('input', function() {
    // Llenar el dropdown con opciones relevantes
    llenarDropdown();

    // Mostrar el dropdown
    opcionesDropdown.style.display = 'block';
});

// Evento clic fuera de la input
document.addEventListener('click', function(event) {
    if (!opcionesDropdown.contains(event.target) && event.target !== inputBusqueda) {
        // Ocultar el dropdown si se hace clic fuera de la input y el dropdown
        opcionesDropdown.style.display = 'none';
    }
});

// Evento clic en una opción del dropdown
opcionesDropdown.addEventListener('click', function(event) {
    // Asignar el valor de la opción seleccionada a la input
    inputBusqueda.value = event.target.value;

    // Ocultar el dropdown
    opcionesDropdown.style.display = 'none';
});

function llenarDropdown() {
    // Eliminar opciones existentes
    opcionesDropdown.innerHTML = '';

    // Obtener las opciones relevantes según el valor de la input
    const opciones = obtenerOpciones(inputBusqueda.value);

    // Agregar opciones al dropdown
    opciones.forEach(opcion => {
        const option = document.createElement('option');
        option.value = opcion;
        option.textContent = opcion; // Agregar este contenido para asegurar la visibilidad
        opcionesDropdown.appendChild(option);
    });
}

function obtenerOpciones(valorInput) {
    // Filtrar las opciones según el valor de la input
    return instrumentosArray.filter(tag => tag.toLowerCase().includes(valorInput.toLowerCase()));
}

function mostrarInstrumentosFiltrados(instrumentosArray) {
    // Limpiar resultados anteriores
    resultadosLista.innerHTML = '';

    // Mostrar nuevos resultados
    instrumentosArray.forEach(instruemnto => {
    let listItem = document.createElement('li');
    listItem.textContent = instruemnto;
    // Agregar un evento al hacer clic en un resultado
    listItem.addEventListener('click', function () {
        inputBusqueda.value = instruemnto; // Puedes ajustar esto según tus necesidades
        resultadosLista.innerHTML = ''; // Limpiar la lista después de seleccionar un equipo
    });
    resultadosLista.appendChild(listItem);
    });
}

function llenarDesdeInput() {
    const equipo = document.getElementById('inputBusqueda').value;
    document.getElementById('inputBusqueda').value = "";
    //Tambien reseteo el dropdown Equipo por las dudas
    document.getElementById('EquiposDropdown').value = "";
    console.log(equipo);
    infoTag(equipo);
}
// =========================================================================================




// =========================== BOTON BUSCAR =========================
function llenarDesdeDropDown() {
    const equipo = document.getElementById('EquiposDropdown').value;
    document.getElementById('EquiposDropdown').value = "";
    //Tambien vacio la input por las dudas
    document.getElementById('inputBusqueda').value = "";
    console.log(equipo);
    infoTag(equipo);
}
// ==================================================================







// ================================ FUNCIONES GENERALES ================================ 
function infoTag(equipo){
    /* Primero debo vaciar los datos, ya que sino se acumulan si el usuario utiliza el filtro mas de 1 vez */
    datosPLC.innerHTML = `<br><h2>Datos en PLC</h2><br>`;
    datosCalibracion.innerHTML = `<br><h2>Datos de Calibración</h2><br>`;
    datosEquipo.innerHTML = `<br><h2>Datos del Equipo</h2><br>`;
    datosSAP.innerHTML = `<br><h2>Datos SAP</h2><br>`; 
    let match = false;
    if (equipo){
        for (const tag in instrumentos) {
            if (equipo === tag) {               
                match = true;    
                appDiv.innerHTML = `<h1>Información del Equipo: ${equipo}</h1>`;                            
                if (instrumentos.hasOwnProperty(tag)) {
                    const instrumento = instrumentos[tag];
                    for (const parametro in instrumento){
                        datosPLC.innerHTML += `<br><td>${parametro}: ${instrumento[parametro]}</td></br>`;
                        datosCalibracion.innerHTML += `<br><td>${parametro}: ${instrumento[parametro]}</td></br>`;
                        datosEquipo.innerHTML += `<br><td>${parametro}: ${instrumento[parametro]}</td></br>`;
                        datosSAP.innerHTML += `<br><td>${parametro}: ${instrumento[parametro]}</td></br>`;
                    }
                }
            }        
        }
        if (match == false){
            appDiv.innerHTML = `<h1>Equipo ${equipo} no existe, buscá correctamente!</h1>`;
        } else {
            match = false;
        }
        /*Chequear de hacerlo de otra forma, esto es muy poco practico*/
        datosPLC.style.backgroundColor = 'rgba(222,222,222,255)'; 
        datosPLC.style.textAlign = 'center';
        datosPLC.style.justifyContent = 'center';
        datosPLC.style.margin = '0px';   
        datosPLC.style.border = '2px solid rgba(0,0,0,255)';
        datosPLC.style.padding = '10px';

        datosCalibracion.style.backgroundColor = 'rgba(222,222,222,255)'; 
        datosCalibracion.style.textAlign = 'center';
        datosCalibracion.style.justifyContent = 'center';
        datosCalibracion.style.margin = '0px';   
        datosCalibracion.style.border = '2px solid rgba(0,0,0,255)';
        datosCalibracion.style.padding = '10px';

        datosEquipo.style.backgroundColor = 'rgba(222,222,222,255)'; 
        datosEquipo.style.textAlign = 'center';
        datosEquipo.style.justifyContent = 'center'
        datosEquipo.style.margin = '0px';   
        datosEquipo.style.border = '2px solid rgba(0,0,0,255)';
        datosEquipo.style.padding = '10px';

        datosSAP.style.backgroundColor = 'rgba(222,222,222,255)'; 
        datosSAP.style.textAlign = 'center';
        datosSAP.style.justifyContent = 'center';
        datosSAP.style.margin = '0px';   
        datosSAP.style.border = '2px solid rgba(0,0,0,255)';
        datosSAP.style.padding = '10px';
    } else {
        console.log("La funcion llenarDesdeInput no hizo nada!")
        console.log("Equipo es: " + equipo)
    }
}
// ===================================================================================== 

function formatoGridInfo(){
    /*Chequear de hacerlo de otra forma, esto es muy poco practico*/
    datosPLC.style.backgroundColor = 'rgba(222,222,222,255)'; 
    datosPLC.style.textAlign = 'center';
    datosPLC.style.justifyContent = 'center';
    datosPLC.style.margin = '0px';   
    datosPLC.style.border = '2px solid rgba(0,0,0,255)';
    datosPLC.style.padding = '10px';

    datosCalibracion.style.backgroundColor = 'rgba(222,222,222,255)'; 
    datosCalibracion.style.textAlign = 'center';
    datosCalibracion.style.justifyContent = 'center';
    datosCalibracion.style.margin = '0px';   
    datosCalibracion.style.border = '2px solid rgba(0,0,0,255)';
    datosCalibracion.style.padding = '10px';

    datosEquipo.style.backgroundColor = 'rgba(222,222,222,255)'; 
    datosEquipo.style.textAlign = 'center';
    datosEquipo.style.justifyContent = 'center'
    datosEquipo.style.margin = '0px';   
    datosEquipo.style.border = '2px solid rgba(0,0,0,255)';
    datosEquipo.style.padding = '10px';

    datosSAP.style.backgroundColor = 'rgba(222,222,222,255)'; 
    datosSAP.style.textAlign = 'center';
    datosSAP.style.justifyContent = 'center';
    datosSAP.style.margin = '0px';   
    datosSAP.style.border = '2px solid rgba(0,0,0,255)';
    datosSAP.style.padding = '10px';
}

formatoGridInfo;

/*
const instrumentosJSON = JSON.stringify(instrumentos, null, 2);
// Crea un objeto Blob con el contenido JSON
const blob = new Blob([instrumentosJSON], { type: 'application/json' });
// Crea un enlace de descarga y simula un clic para descargar el archivo
const a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = 'instrumentos.json';
a.click();
*/



// ================================ EVENTOS ================================ 
//darkModeToggle.addEventListener('click', toggleDarkMode); PARA HACER LUEGO
sectorDropdown.addEventListener('change', rellenarEquiposDropdown);
filtrarButton.addEventListener('click', llenarDesdeInput);
searchButton.addEventListener('click', llenarDesdeDropDown);
// =========================================================================














/* EXPLICACIONES:

Esta línea define una expresión regular (regex o regexp) en JavaScript. Ahora, desglosemos cada parte de esta expresión regular:

-   /\[([^]+)\]/: Esto define la expresión regular. La expresión está encerrada entre barras inclinadas (/.../), que es la forma en que se crean expresiones regulares en JavaScript.

-   \[: Este es un carácter de escape para el corchete cuadrado abierto "[". La barra invertida \ se utiliza para escapar el corchete y tratarlo literalmente en lugar de como un carácter especial en una expresión regular.

-   ([^]+): Este es un grupo de captura que coincide con uno o más caracteres que no son corchetes cuadrados cerrados "]". Aquí, [^] representa cualquier carácter que no sea un corchete cuadrado cerrado, y el + indica que debe haber uno o más de estos caracteres. Los paréntesis ( y ) crean un grupo de captura para recordar el contenido coincidente.

-   \]: Este es otro carácter de escape para el corchete cuadrado cerrado "]".

Entonces, en resumen, esta expresión regular busca coincidencias con patrones que comienzan con "[" y terminan con "]", capturando todo lo que está entre esos corchetes en un grupo de captura. En el contexto del código anterior, se utiliza para extraer el índice del motor, que está encerrado entre corchetes en las líneas que contienen <Element Index="[X]">.





*/