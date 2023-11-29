let rutaArchivo = 'http://127.0.0.1:5501/assets/text/PLC_Linea3A.L5X';

let lines;

//============================PREPARACION TAGS BOOLEANOS=======================================================
const tagsBooleanos = [ 'aaaa_hab_VAN675_676_677',
                        'ACUM_SSL_ALI453_MIN'];
//=============================================================================================================

//============================PREPARACION PARA MOTOR_NRO=======================================================
//CODIGO PARA EXTRAER VALORES DE MOTOR_NRO
const motorNroInicio = 'Tag Name="MOTOR_NRO"'; //Para detectar el inicio del bloque de texto motor
const motorNroFin = '</Tag>'; //Para detectar el fin del bloque de texto motor
let inMotorNro = false; //Indica si se está o no dentro del bloque de texto motor
const motorIndicesToExtract = [7, 50, 139, 383, 59, 999];
const parametrosAExtraerMotorNro = ['Falla1_Hab', 
                                    'ArrAuto', 
                                    'Min_Marcha', 
                                    'PRE']; //Parametros a extraer del tipo de dato "MOTOR_NRO", esta lista debe tener mismo orden que en el Tag del PLC
let actualMotorIndice = null; //Almacena el indice extraido del texto del elemento que se está procesando
let actualMotorParametros = {};

// Función para imprimir en consola la información del motor actual
const almacenarMotor = () => { //En vez de printear deberia hacer un Objecto.
    if (actualMotorIndice !== null && Object.keys(actualMotorParametros).length > 0) {
        for (const parametro in actualMotorParametros) {
            const parametroValor = actualMotorParametros[parametro];
            //console.log(`Motor_NRO ${actualMotorIndice}, parametro ${parametro}, valor ${parametroValor}`);            
        }
    }
};
//=============================================================================================================

//============================PREPARACION PARA AI_VARIOS_NRO===================================================
//CODIGO PARA EXTRAER VALORES DE Ai_NRO
const aiVariosNroInicio = 'Tag Name="AI_VARIOS_Nro"'; //Para detectar el inicio del bloque de texto aiVariosNro
const aiVariosNroFin = '</Tag>'; //Para detectar el fin del bloque de texto aiVariosNro
let inAiVariosNro = false; //Indica si se está o no dentro del bloque de texto aiVariosNro

const parametrosAExtraerAiVariosNro = [ 'Min_Analog', 
                                        'Max_Analog', 
                                        'Min_Escala', 
                                        'Max_Escala',
                                        'Nivel_Bajo_Alarma',
                                        'Nivel_Alto_Alarma']; //Parametros a extraer del tipo de dato "AI_VARIOS_Nro", esta lista debe tener mismo orden que en el Tag del PLC
let actualAiVariosIndice = null;
let actualAiVariosParametros = {};

// Función para imprimir en consola la información del aiVarios actual
const almacenarAiVarios = () => { //En vez de printear deberia hacer un Objecto.
    if (actualAiVariosIndice !== null && Object.keys(actualAiVariosParametros).length > 0) {
        for (const parametro in actualAiVariosParametros) {
            const parametroValor = actualAiVariosParametros[parametro];
            //console.log(`AI_VARIOS_Nro ${actualAiVariosIndice}, parametro ${parametro}, valor ${parametroValor}`);
            for (const tag in AI_VARIOS_Nro_L3A){
                if (AI_VARIOS_Nro_L3A[tag].Indice == actualAiVariosIndice) {
                    AI_VARIOS_Nro_L3A[tag][parametro] = parametroValor;
                }
            }
        }
    }
};

export let AI_VARIOS_Nro_L3A = {
    PDT_LIM307: {Indice: 1},
    PDT_LIM308: {Indice: 2},
    LT_BH301_04: {Indice: 3},
    LT_BH302_04: {Indice: 4},
    MT_CYC304: {Indice: 5},
    MT_CYC355: {Indice: 6},
    PDT_CYC304: {Indice: 7},
    PDT_CYC355: {Indice: 8},
    PT_CYC304: {Indice: 9},
    PT_CYC355: {Indice: 10},
    TT_BH301_01: {Indice: 11},
    TT_BH301_05: {Indice: 12},
    TT_BH302_01: {Indice: 13},
    TT_BH302_05: {Indice: 14},
    ZS_NOR304_A1: {Indice: 15},
    ZS_NOR304_A2: {Indice: 16},
    ZS_NOR304_B1: {Indice: 17},
    ZS_NOR304_B1: {Indice: 18},
    WT_PUL301: {Indice: 19},
    WT_PUL303: {Indice: 20},
    WT_ENF301: {Indice: 31},
    WT_SEC305: {Indice: 22},
    PT_CAL302: {Indice: 23},
    TT_ENF301_09: {Indice: 24},
    TT_BH301_02: {Indice: 25},
    TT_BH301_03: {Indice: 26},
    TT_BH301_04: {Indice: 27},
    TT_BH302_02: {Indice: 28},
    TT_BH302_03: {Indice: 29},
    TT_BH302_04: {Indice: 30},
    TT_CAL302_01: {Indice: 31},
    TT_CAL302_02: {Indice: 32},
    TT_LAM316: {Indice: 33},
    TT1_MIL307: {Indice: 34},
    TT2_MIL307: {Indice: 35},
    TT1_MIL308: {Indice: 36},
    TT2_MIL308: {Indice: 37},
    WT_ENF303: {Indice: 38},
    FQT_R502_06A: {Indice: 40},
    FQT_R502_03: {Indice: 41}, //VER BIEN 42, 43, 44
    FQT_EXP_L3A: {Indice: 45},
    FQT_BH_L3A: {Indice: 46},
    PDT_FAN641: {Indice: 47},
    PDT_FAN651: {Indice: 48},
    PDT_FAN661: {Indice: 49},
    PDT_FAN642: {Indice: 50},
    PDT_FAN652: {Indice: 51},
    PDT_FAN662: {Indice: 52},
    TT_FIM640: {Indice: 53},
    TT_FIM650: {Indice: 54},
    TT_FIM660: {Indice: 55},
    PT_DMP642: {Indice: 56},
    PT_DMP652: {Indice: 57},
    PT_DMP662: {Indice: 58},
    TT_FIM640_2: {Indice: 59},
    TT_FIM650_2: {Indice: 60},
    TT_FIM660_2: {Indice: 61},
    TT_CAL305: {Indice: 62},
    TT_CAL305: {Indice: 63},
    HT_FAN642: {Indice: 64},
    HT_FAN652: {Indice: 65},
    HT_FAN662: {Indice: 66},
    TT_FAN642: {Indice: 67},
    TT_FAN652: {Indice: 68},
    TT_FAN662: {Indice: 69},
    TT_FAN640: {Indice: 70},
    HT_FAN640: {Indice: 71},
    TT_FAN650: {Indice: 72},
    HT_FAN650: {Indice: 73},
    TT_FAN660: {Indice: 74},
    HT_FAN660: {Indice: 75},
    LT_JDH640: {Indice: 76},
    LT_JDH650: {Indice: 77},
    LT_JDH660: {Indice: 78},
    PDT_JDH640: {Indice: 79},
    PDT_JDH650: {Indice: 80},
    PDT_JDH660: {Indice: 81},
    PT_JDH640: {Indice: 82},
    PT_JDH650: {Indice: 83},
    PT_JDH660: {Indice: 84},
    TT_JDH640_1: {Indice: 85},
    TT_JDH640_2: {Indice: 86},
    TT_JDH650_1: {Indice: 87},
    TT_JDH650_2: {Indice: 88},
    TT_JDH660_1: {Indice: 89},
    TT_JDH660_2: {Indice: 90},
    PDT_FIM640: {Indice: 91},
    PDT_FIM650: {Indice: 92},
    PDT_FIM660: {Indice: 93},
    HT_ASP402: {Indice: 94},
    HT_ASP404: {Indice: 95},
    HT_ASP406: {Indice: 96},
    TT_ASP402: {Indice: 97},
    TT_ASP404: {Indice: 98},
    TT_ASP406: {Indice: 99},
    PT_ASP402: {Indice: 100},
    PT_ASP404: {Indice: 101},
    PT_ASP406: {Indice: 102},
    PDT_ASP402: {Indice: 104},
    PDT_ASP404: {Indice: 105},
    PDT_ASP406: {Indice: 106},
    TT1_MIL306: {Indice: 107},
    TT2_MIL306: {Indice: 108},
    LT_SIL306: {Indice: 109},
    NIR_C310_Proteina: {Indice: 110},
    NIR_C310_Humedad: {Indice: 111},
    NIR_C310_Grasa: {Indice: 112},
    NIR_C310_Fibra: {Indice: 113},
    LT_TLV_303: {Indice: 114},
    TT_CCMPREP3_AMB: {Indice: 115}
};
let aiVariosIndicesToExtract = [];
for (const tag in AI_VARIOS_Nro_L3A){
    aiVariosIndicesToExtract.push(AI_VARIOS_Nro_L3A[tag].Indice);
}

function procesarLineas(){
    // Bucle a través de las líneas para encontrar los tags y extraer los valores
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];        
        for (const tag of tagsBooleanos) {
            if (line.includes(`<Tag Name="${tag}"`)) {
                // Encontramos el tag, ahora busquemos el valor en las líneas subsiguientes
                let valueLineIndex = i + 1;    
                while (valueLineIndex < lines.length && !lines[valueLineIndex].includes('</Tag>')) {
                    if (lines[valueLineIndex].includes('Value="')) {
                        const regex = /Value="([^"]*)"/;
                        const match = lines[valueLineIndex].match(regex);
                        const value = match ? match[1] : null;
                        //console.log(`Tag: ${tag}, Value: ${value}`);
                        break;
                    }    
                valueLineIndex++;
                }
            }
        }
    }



    // Bucle a través de las líneas para encontrar los tags y extraer los valores
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Con esto identifico si estoy o no dentro del bloque de texto que contiene al array Motor_NRO
        if (line.includes(motorNroInicio) && inMotorNro == false){
            inMotorNro = true;
            //console.log("inMotorNro cambio a: " + inMotorNro);
        } else if (inMotorNro == true && line.includes(motorNroFin) ) {
            inMotorNro = false
            //console.log("inMotorNro cambio a: " + inMotorNro);
        }            
        // Buscar el índice del motor
        if (inMotorNro == true && line.includes('<Element Index="[')) {
            const regex = /\[([^]+)\]/; // CAPTURA TODO LO QUE ESTA DENTRO DE '['  Y  ']'
            const match = line.match(regex); // MATCH DEVUELVE UN ARRAY DE 2 ELEMENTOS, 1° REGEX Y 2° LO DE DENTRO DEL REGEX
            actualMotorIndice = match ? parseInt(match[1]) : null; // LA EXPRESIÓN MATCH ENCONTRO ALGO, ENTONCES PARSEINT DEVUELVE EL ENTERO ENCONTRADO
            //actualMotorParametros = {};
            
            if (motorIndicesToExtract.includes(actualMotorIndice)) { //indice actual procesado dentro de la lista de indices?
                for (const parametro of parametrosAExtraerMotorNro) { //extraigo 1a1 los parametros de la lista para obtener su Valor
                    while (i < lines.length && !lines[i].includes('</Element>')) { //chequear condicion...busco linea a linea el valor del perimer parametro
                        if (lines[i].includes(`<DataValueMember Name="${parametro}"`)) {
                            const regex = /Value="([^"]*)"/;
                            const match = lines[i].match(regex);
                            const parametroValor = match ? match[1] : null;
                            actualMotorParametros[parametro] = parametroValor;
                            break;
                        }
                    i++;
                    }
                }
            // Imprimir en consola la información del motor actual
            almacenarMotor();
            }                    
        }
    }


    // Bucle a través de las líneas para encontrar los tags y extraer los valores
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Con esto identifico si estoy o no dentro del bloque de texto que contiene al array AI_VARIOS_Nro
        if (line.includes(aiVariosNroInicio) && inAiVariosNro == false){
            inAiVariosNro = true;
            //console.log("inAiVariosNro cambio a: " + inAiVariosNro);
        } else if (inAiVariosNro == true && line.includes(aiVariosNroFin) ) {
            inAiVariosNro = false;
            //console.log("inAiVariosNro cambio a: " + inAiVariosNro);           
        }            
        // Buscar el índice del motor
        if (inAiVariosNro == true && line.includes('<Element Index="[')) {
            const regex = /\[([^]+)\]/; // CAPTURA TODO LO QUE ESTA DENTRO DE '['  Y  ']'
            const match = line.match(regex); // MATCH DEVUELVE UN ARRAY DE 2 ELEMENTOS, 1° REGEX Y 2° LO DE DENTRO DEL REGEX
            actualAiVariosIndice = match ? parseInt(match[1]) : null; // LA EXPRESIÓN MATCH ENCONTRO ALGO, ENTONCES PARSEINT DEVUELVE EL ENTERO ENCONTRADO
            actualAiVariosParametros = {};            

            // Si el índice del motor está en la lista, extraer los parámetros
            if (aiVariosIndicesToExtract.includes(actualAiVariosIndice)) {
                for (const parametro of parametrosAExtraerAiVariosNro) {
                    // Buscar los valores de los parámetros especificados
                    while (i < lines.length && !lines[i].includes('</Element>')) {
                        if (lines[i].includes(`<DataValueMember Name="${parametro}"`)) {
                            const regex = /Value="([^"]*)"/;
                            const match = lines[i].match(regex);
                            const parametroValor = match ? match[1] : null;
                            actualAiVariosParametros[parametro] = parametroValor;
                            break;

                        }
                    i++;
                    }
                }
            // Imprimir en consola la información del motor actual
            almacenarAiVarios();
            }                    
        }
    }
    for (const tag in AI_VARIOS_Nro_L3A){
        AI_VARIOS_Nro_L3A[tag]['Sector'] = 'L3A';
    }
};

// Función para cargar el archivo y procesar las líneas
function cargarYProcesarArchivo() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', rutaArchivo, false); // El tercer parámetro es `false` para hacer la solicitud síncrona
    xhr.send();

    if (xhr.status === 200) {
        lines = xhr.responseText.split('\n');
        procesarLineas();
    } else {
        console.error('Error al cargar el archivo:', xhr.status);
    }
}

// Llamar a la función y luego ejecutar código después de que se complete
cargarYProcesarArchivo();

console.log("================TERMINO EL SCRIPT L3A===================")




































































/*
// Realizar la solicitud mediante fetch. El mismo es un evento asincronico por lo tanto no se ejecuta en el orden del script
fetch(rutaArchivo)
    .then(response => {
        if (!response.ok) {
            throw new Error(`No se pudo cargar el archivo: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        // Dividir el contenido por saltos de línea
        lines = data.split('\n');
        //console.log("Primera fila de lineas es: " + lines[10])
        procesarLineas();
        console.log("YA TERMINE")
    })
    .catch(error => {
        console.error('Error al cargar el archivo:', error);
    });
*/




//=========================MUY IMORTANTE==============================
/*Sí, el código dentro de la función fetch se ejecuta de manera asíncrona, y el bloque console.log(lineas[41540]) se ejecuta inmediatamente después de que se inicia la solicitud, antes de que la respuesta haya sido completada.

La razón es que fetch es una operación asíncrona y no bloqueante. El código continuará ejecutándose después de llamar a fetch en lugar de esperar la respuesta. En tu caso, la función fetch se ejecutará en segundo plano, y el código continuará con la ejecución sin esperar a que se complete la solicitud.

Si necesitas trabajar con los datos después de que se complete la solicitud, debes hacerlo dentro del bloque .then o mediante una función que se llame desde allí, ya que ese bloque se ejecuta una vez que la solicitud ha sido exitosa.
*/

