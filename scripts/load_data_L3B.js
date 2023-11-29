let rutaArchivo = 'http://127.0.0.1:5501/assets/text/PLC_Linea3B.L5X';

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
            for (const tag in AI_VARIOS_Nro_L3B){
                if (AI_VARIOS_Nro_L3B[tag].Indice == actualAiVariosIndice) {
                    AI_VARIOS_Nro_L3B[tag][parametro] = parametroValor;
                }
            }
        }
    }
};

export let AI_VARIOS_Nro_L3B = {
    PDT_LIM305: {Indice: 1},
    PDT_LIM306: {Indice: 2},
    LT_BH303_04: {Indice: 3},
    LT_BH304_04: {Indice: 4},
    MT_CYC306: {Indice: 5},
    MT_CYC356: {Indice: 6},
    PDT_CYC306: {Indice: 7},
    PDT_CYC356: {Indice: 8},
    PT_CYC306: {Indice: 9},
    PT_CYC356: {Indice: 10},
    TT_BH303_01: {Indice: 11},
    TT_BH303_05: {Indice: 12},
    TT_BH304_01: {Indice: 13},
    TT_BH304_05: {Indice: 14},
    ZS_NOR303_A1: {Indice: 15},
    ZS_NOR303_A2: {Indice: 16},
    ZS_NOR303_B1: {Indice: 17},
    ZS_NOR303_B1: {Indice: 18},
    WT_PUL302: {Indice: 19},
    WT_PUL304: {Indice: 20},
    WT_ENF302: {Indice: 31},
    WT_SEC306: {Indice: 22},
    PT_CAL304: {Indice: 23},
    TT1_MIL311: {Indice: 24},
    TT2_MIL311: {Indice: 25},
    TT1_MIL312: {Indice: 26},
    TT2_MIL312: {Indice: 27},
    TT_ENF302_09: {Indice: 28},
    TT_BH303_02: {Indice: 29},
    TT_BH303_03: {Indice: 30},
    TT_BH303_04: {Indice: 31},
    TT_BH304_02: {Indice: 32},
    TT_BH304_03: {Indice: 33},
    TT_BH304_04: {Indice: 34},
    TT_CAL304_01: {Indice: 35},
    TT_CAL304_02: {Indice: 36},
    TT_LAM333: {Indice: 37},
    LT_V502: {Indice: 38},
    TT_R507: {Indice: 39},
    WT_ENF304_FIL: {Indice: 40}, 
    FQT_R502_06B: {Indice: 42},
    FQT_R502_04: {Indice: 43},
    ENF304: {Indice: 109},
    SEC306: {Indice: 110},
    ENF302: {Indice: 111},
    FQT_EXP_L3B: {Indice: 112},
    FQT_BH_L3B: {Indice: 113},
    TT1_MIL310: {Indice: 114},
    TT1_MIL310: {Indice: 115},
    LT_SIL305: {Indice: 116},
    XT_LAM332: {Indice: 117},
    NIR_C311_Proteina: {Indice: 118},
    NIR_C311_Humedad: {Indice: 119},
    NIR_C311_Grasa: {Indice: 120},
    NIR_C311_Fibra: {Indice: 121},
    TT_ROCIO: {Indice: 122},
    IT_COM501: {Indice: 123},
    LT_TLV_301: {Indice: 124},
};
let aiVariosIndicesToExtract = [];
for (const tag in AI_VARIOS_Nro_L3B){
    aiVariosIndicesToExtract.push(AI_VARIOS_Nro_L3B[tag].Indice);
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
    for (const tag in AI_VARIOS_Nro_L3B){
        AI_VARIOS_Nro_L3B[tag]['Sector'] = 'L3B';
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

console.log("================TERMINO EL SCRIPT L3B===================")






































































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

    })
    .catch(error => {
        console.error('Error al cargar el archivo:', error);
    });
*/

//=========================MUY IMORTANTE==============================
/*Sí, el código dentro de la función fetch se ejecuta de manera asíncrona, y el bloque console.log(lineas[41540]) se ejecuta inmediatamente después de que se inicia la solicitud, antes de que la respuesta haya sido completada.

La razón es que fetch es una operación asíncrona y no bloqueante. El código continuará ejecutándose después de llamar a fetch en lugar de esperar la respuesta. En tu caso, la función fetch se ejecutará en segundo plano, y el código continuará con la ejecución sin esperar a que se complete la solicitud.

Si necesitas trabajar con los datos después de que se complete la solicitud, debes hacerlo dentro del bloque .then o mediante una función que se llame desde allí, ya que ese bloque se ejecuta una vez que la solicitud ha sido exitosa. */