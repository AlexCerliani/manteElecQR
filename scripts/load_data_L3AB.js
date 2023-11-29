let rutaArchivo = 'http://127.0.0.1:5501/assets/text/PLC_Linea3AB.L5X';

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
            for (const tag in AI_VARIOS_Nro_L3AB){
                if (AI_VARIOS_Nro_L3AB[tag].Indice == actualAiVariosIndice) {
                    AI_VARIOS_Nro_L3AB[tag][parametro] = parametroValor;
                }
            }
        }
    }
    //console.log(AI_VARIOS_Nro_L3AB);
};

export let AI_VARIOS_Nro_L3AB = {
    LT_SIL301: {Indice: 0},
    LT_SIL302: {Indice: 1},
    LT_TK301_FILTRADA: {Indice: 2},
    LT_TK302_FILTRADA: {Indice: 3},
    LT_TK303_FILTRADA: {Indice: 4},
    LT_TK304_FILTRADA: {Indice: 5},
    LT_TK305_FILTRADA: {Indice: 6},
    VSH_R504_01: {Indice: 7},
    VSH_R504_02: {Indice: 8},
    VSH_R504_03: {Indice: 9},
    VSH_R504_04: {Indice: 10},
    FT_R504_01_FILTRADA: {Indice: 11},
    LT_R504_01: {Indice: 12},
    TT_PEL681: {Indice: 13},
    TT_PEL682: {Indice: 14},
    TT_PEL683: {Indice: 15},
    PDT_ASP464: {Indice: 16},
    PT_PEL681: {Indice: 17},
    PT_PEL682: {Indice: 18},
    PT_PEL683: {Indice: 19},
    TT_PEL684: {Indice: 20},
    TT_PEL684: {Indice: 21},
    PDT_ASP469: {Indice: 22},
    PT_PEL684: {Indice: 23},
    PT_PEL685: {Indice: 24},    
    PT_AI_L3: {Indice: 25},
    LT_TK680: {Indice: 26},
    XT_TAC515: {Indice: 32},
    PDT_FIM231: {Indice: 33},
    PDT_ASP414: {Indice: 34},
    HT_ASP414: {Indice: 35},
    TT_ASP414: {Indice: 36},
    PT_ASP414: {Indice: 37},
    HT_PECASO: {Indice: 38},
    TT_PECASO: {Indice: 39},
    PDT_FIM673: {Indice: 40},
    PDT_FIM672: {Indice: 41},
    TT_MIL671: {Indice: 42},
    TT_MIL672: {Indice: 43},
    TT_MIL673: {Indice: 44},
    TT_FIM671: {Indice: 45},
    LT_SIL001: {Indice: 46},
    PDT_ASP465: {Indice: 47},
    IT_COM502: {Indice: 48},
    LT_TLV_1: {Indice: 50},
    LT_TLV_2: {Indice: 51},
    TTC1_MIL301: {Indice: 52},
    TTC1_MIL302: {Indice: 53},
    LT_TLV_PPAL: {Indice: 54},
    TTRI_MIL301: {Indice: 55},
    TTRD_MIL301: {Indice: 56},
    TTC1_MIL302: {Indice: 57},
    TTC2_MIL302: {Indice: 58},
    TTRI_MIL302: {Indice: 60},
    TTRD_MIL302: {Indice: 61},
    HT_PEL681: {Indice: 70},
    HT_PEL682: {Indice: 71},
    HT_PEL683: {Indice: 72},
    HT_PEL684: {Indice: 73},
    HT_PEL685: {Indice: 74},
    PIT_680: {Indice: 75},
    PT_FIM330: {Indice: 80},
    FT_681: {Indice: 90},
    FT_682: {Indice: 91},
    FT_683: {Indice: 92},
    FT_684: {Indice: 93},
    FT_685: {Indice: 94},
};
let aiVariosIndicesToExtract = [];
for (const tag in AI_VARIOS_Nro_L3AB){
    aiVariosIndicesToExtract.push(AI_VARIOS_Nro_L3AB[tag].Indice);
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
    for (const tag in AI_VARIOS_Nro_L3AB){
        AI_VARIOS_Nro_L3AB[tag]['Sector'] = 'L3AB';
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

console.log("================TERMINO EL SCRIPT L3AB==================")




































































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