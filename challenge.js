//importamos readline del modulo redline que ofrece Node
import readline from 'readline';

const students = [{
  age: 32,
  examScores: [],
  gender: 'male',
  name: 'edu'
},
{
  age: 29,
  examScores: [],
  gender: 'female',
  name: 'silvia'
}]
  
const availableMaleNames = ['pepe', 'edu', 'juan', 'victor', 'Leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'laura', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

//Creamos el mensaje que se mostrará con el menú
const mensaje = '\n\tMENÚ\n'
    + '\n1- Mostrar todos los alumnos en una tabla.' 
    + '\n2- Mostrar la cantidad de alumnos que hay en clase.'
    + '\n3- Mostrar todos los nombres de los alumnos.'
    + '\n4- Eliminar el último alumno de la clase.'
    + '\n5- Eliminar un alumno aleatoriamente de la clase.'
    + '\n6- Mostrar todos los datos de los alumnos que son chicas.'
    + '\n7- Mostrar el número de chicos y chicas que hay en la clase.'
    + '\n8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.'
    + '\n9- Mostrar los nombres de los alumnos que tengan entre 20 y 25 años.'
    + '\n10- Añadir un alumno nuevo con nombre aleatorio, edad aleatoria entre 20 y 50 años, género aleatorio i listado de calificaciones vacío.'
    + '\n11- Mostrar el nombre de la persona más joven de la clase.'
    + '\n12- Mostrar la edad media de todos los alumnos de la clase.'
    + '\n13- Mostrar la edad media de las chicas de la clase.'
    + '\n14- Añadir nueva nota aleatoria (entre 0 y 10) a los alumnos.'
    + '\n15- Ordenar a los alumnos alfabéticamente según su nombre.'
    //PARTE OPCIONAL
    + '\n16- Mostrar el alumno de la clase con las mejores notas.' 
    + '\n17- Mostrar la nota media más alta de la clase y el nombre del alumno al que pertenece.'
    + '\n18- Añadir un punto extra a cada nota existente de todos los alumnos. Si aún no tienen registrada ninguna nota, se les otorgará un 10.\n'
    + '\nPara salir de la aplicación pulse cualquier número excepto números entre 1 y 18.\n' 

//Configuramos la utilidad de Node para que los datos se pidan y se muestren por consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Funcion que retorna un número entero aleatorio entre un min y un max recibidos por parámetro
function calculateRandomNumber(min, max){
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

//Función flecha. Comprueva si el número introducido por el usuario es un número entero o no
const isInt = (optionStr) => {
    //Si no puede parsear a entero porque no es un número integer y retorna un NaN
    const optionInteger = parseInt(optionStr); 
    if(Number.isNaN(optionInteger)){ 
        return false 
    } else {
        return true
    }
}

function getOptionFromConsole(){
    //Creamos la promesa
    const promise = new Promise((resolve, reject) => {
        //Usamos el método question de readline, el cual nos permite hacer una pregunta por consola al usuario
        rl.question(mensaje + '\nIntroduce la opción que desea ejecutar (número entero): ', (option) =>{
            rl.pause(); //Pausamos la referencia readLine una vez responda para que no se quede colgado
            //Comprobamos si es un entero. Si és así, se resuelve la promesa enviando la opción escogida 
            if(isInt(option)){
                option = parseInt(option);
                resolve(option);
            //Si no es un entero, se hace un reject mostrando el error
            }else{
                reject('Necesita introducir un número entero.')
            }
        })
    })
    return promise;
}

//Creamos la función asincrona 
async function runApp(){
    let optionFromConsole;
    const MIN_OPTIONS = 1;
    const MAX_OPTIONS = 18;
    do{
        //Llamamos al método que crea la promesa para pedir al usuario una opción
        try {
            optionFromConsole = await getOptionFromConsole();
        //Si la promesa se rechaza, se ejecuta el catch e imprimimos el error que envia el reject
        } catch (error) { 
            console.log(error)
            //Matamos el proceso de node, necesario para finalizar el programa
            process.exit(0); 
        }
        //Con un switch, acutamos según la opción escogida por el usuario
        switch(optionFromConsole){
            case 1:
                mostrarTabla();
                break;
            case 2:
                mostrarTotalAlumnos();
                break;
            case 3:
                mostrarNombresAlumnos();
                break;
            case 4:
                eliminarUltimoAlumno();
                break;
            case 5:
                eliminarAlumnoAleatorio();
                break;
            case 6:
                mostrarDatosChicas();
                break;            
            case 7:
                mostrarTotalChicosyChicas();
                break;            
            case 8:
                isTodasChicas();
                break;            
            case 9:
                mostrarNombres20_25();
                break;            
            case 10:
                addNuevoAlumno();
                break;            
            case 11:
                mostrarAlumnoMasJoven();
                break;            
            case 12:
                mostrarEdadMediaTotal();
                break;            
            case 13:
                mostrarEdadMediaChicas();
                break;            
            case 14:
                addNuevaNota();
                break;            
            case 15:
                ordenarAlfabeticamente();
                break;            
            case 16:
                mostrarMejorAlumno();
                break;            
            case 17:
                mostrarMejorNotaMediayAlumno();
                break;            
            case 18:
                addPuntoExtra();
                break; 
            //Si ha escodigo una opción que no está entre el 1 y el 18 nos desmedimos 
            default:
                console.log('Muchas gracias por usar la aplicación. \n¡Hasta pronto!')
                //Cerramos la referencia readLine una vez se finalice la aplicación
                rl.close() 
                break;   
        }
    //Condición para continuar: Que siga mientras la opción sea mayor o igual a 1 y sea menor o igual que 18
    }while ((optionFromConsole >= MIN_OPTIONS) && (optionFromConsole <= MAX_OPTIONS)) 
}

function mostrarTabla(){
    //Si no hay ningun alumno introducido, muestra mensaje
    if(students.length == 0){
        console.log('No hay alumnos introducidos');
    }else{
        //Mostramos a los alumnos en formato tabla
        console.table(students);
    }
}

function mostrarTotalAlumnos(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        //Mostramos la longitud del array students (cantidad de alumnos introducidos en el array)
        console.log('Hay un total de ' + students.length + ' alumnos en clase.');
    }
}

function mostrarNombresAlumnos(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        //Recorremos el array para mostrar todos los nombres de los alumnos
        for(let i = 0; i < students.length; i++)
            console.log(students[i].name);
    }
}

function eliminarUltimoAlumno(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        //Eliminamos al último alumno del array. Mostramos tabla antes y después.
        mostrarTabla();
        students.pop();
        mostrarTabla();
    }
}

function eliminarAlumnoAleatorio(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        mostrarTabla();
        //Calculamos un numero aleatorio entre 0 y la longitud del array students
        let index = calculateRandomNumber(0, students.length - 1);
        //Eliminamos al alumno aleatorio del array. Mostramos tabla antes y después.
        students.splice(index, 1);
        mostrarTabla();
    }
}

function mostrarDatosChicas(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        //Recorremos el array y mostramos a los estudantes los cuales coincidan su género con 'female'
        for(let i = 0; i < students.length; i++){
            if(students[i].gender == 'female'){
                console.log(students[i]);
            }
        }
    }
}

function mostrarTotalChicosyChicas(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        let totalChicos = 0;
        let totalChicas = 0;
        //Recorremos el array. Segun el género del estudiante añadimos 1 a la variable totalChicos o totalChicas
        for(let i = 0; i < students.length; i++){
            if(students[i].gender == 'female'){
                totalChicas++;
            }else if(students[i].gender == 'male'){
                totalChicos++;
            }
        }
        //Mostramos ambos contadores
        console.log(`Chicos en la clase: ${totalChicos} \nChicas en la clase: ${totalChicas}`);
    }
}

function isTodasChicas(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        let todasChicas = true;
        //Recorremos el array y modificamos el boolean a false en cuando encuentre un estudiante con género 'male'
        for(let i = 0; i < students.length; i++){
            if(students[i].gender == 'male'){
                todasChicas = false;
            }
        }    
        //Mostramos el valor del boolean
        console.log('En la clase son todas chicas? ' + todasChicas);
    }
}

function mostrarNombres20_25(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        let alumnosJovenes = [];
        //Recorremos el array. Si el alumno tiene entre 20 y 25 años, almacenamos su nombre en el array alumnosJovenes 
        for(let i = 0; i < students.length; i++){
            if((students[i].age >= 20) && (students[i].age <= 25)){
                alumnosJovenes.push(students[i].name);
            }
        }
        //Si no se ha almacenado ningun alumno en el array alumnosJovenes, se imprime mensaje
        if(alumnosJovenes.length == 0){
            console.log('No hay ningún alumno que tenga entre 20 y 25 años');
        //Por lo contrario, se recorre el array alumnosJovenes y se muestra cada nombre almacenado en él
        }else{
            for(let i = 0; i < alumnosJovenes.length; i++){
                console.log(alumnosJovenes[i]);
            }
        }
    }
}

function addNuevoAlumno(){
    //Creamos aleatoriamente el género y la edad 
    let randomGender = calculateRandomNumber(0, availableGenders.length - 1);
    let randomAge = calculateRandomNumber(20, 50);
    //Creamos un nombre aleatorio segun si el género aleatorio escogido es 'male' o 'female'
    let randomNameIndex = 0;
    let randomName;
    if(randomGender == 0){
        randomNameIndex = calculateRandomNumber(0, availableMaleNames.length - 1);
        randomName = availableMaleNames[randomNameIndex];
    }else if(randomGender == 1){
        randomNameIndex = calculateRandomNumber(0, availableFemaleNames.length - 1);
        randomName = availableFemaleNames[randomNameIndex];
    }
    //Creamos el nuevo alumno con los nuevos datos 
    let nuevoAlumno = {
        age: randomAge,
        examScores: [],
        gender: availableGenders[randomGender],
        name: randomName
    }
    //Añadimos el nuevo alumno al array students y mostramos la tabla
    students.push(nuevoAlumno);
    mostrarTabla();
}

function mostrarAlumnoMasJoven(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        //Inicializamos la variable con el primer estudiante del array students
        let alumnoMasJoven = students[0];
        //Recorremos el array y comparamos las edades de los estudiantes con la ayuda de la variable alumnoMasJoven
        for(let i = 0; i < students.length; i++){
            //Si la edad del estudiante es menor a la almacenada en la variable, se asigna como nuevo valor a ésta
            if(students[i].age < alumnoMasJoven.age){
                alumnoMasJoven = students[i];
            }
        }
        //Se muestra el nombre del alumno mas joven
        console.log(alumnoMasJoven.name);
    }
}

function mostrarEdadMediaTotal(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        let edadTotal = 0;
        //Se recorre el array y se va acumulando la suma de las edades en la variable edadTotal
        for(let i = 0; i < students.length; i++){
            edadTotal += students[i].age;
        }
        //Se calcula la media dividiendo la edad total entre la longiutd del array students. Se muestra redondeada a entero.
        let edadMediaTotal = edadTotal/students.length;
        console.log(edadMediaTotal.toFixed(0));
    }
}

function mostrarEdadMediaChicas(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        let edadChicas = 0;
        let contador = 0;
        //Recorremos el array students. Si el alumno es mujer, sumamos su edad a edadChicas y añadimos 1 al contador
        for(let i = 0; i < students.length; i++){
            if(students[i].gender == 'female'){
                edadChicas += students[i].age;
                contador++;
            }
        }
        //Calculamos la media de edad de las chicas dividiendo la suma de edades entre el número total de alumnas y mostramos
        let edadMediaChicas = edadChicas/contador;
        console.log(edadMediaChicas.toFixed(0));
    }
}

function addNuevaNota(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        //Recorremos el array students. Por cada alumno calculamos una nota aleatoria y la añadimos al atributo (array) examScores
        for(let i = 0; i < students.length; i++){
            let nuevaNota = calculateRandomNumber(0, 10);
            students[i].examScores.push(nuevaNota);
        }
        //Mostramos la tabla final actualizada
        mostrarTabla();
    }
}

function ordenarAlfabeticamente(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        //Usamos el método sort() y localeCompare() para ordenar los estudiantes segun su nombre
        let arrayOrdenado = students.sort((x,y) =>{
            return x.name.localeCompare(y.name);
        })
        //Mostramos una tabla con el array ordenado
        console.table(arrayOrdenado);
    }
}

function mostrarMejorAlumno(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        //Llamamos al método que nos devolverá un objeto con la nota media del mejor alumno y su indice
        let datosMejorAlumno = getMejorNotaeIndiceAlumno();
        //Si la mejor nota tiene un -1 como valor es que aun no se ha introducido ninguna nota
        if(datosMejorAlumno.mejorNota == -1){
            console.log('Aún no se ha introducido ninguna nota a ningún alumno')
        }else{
            //Accedemos al mejor alumno e imprimimos sus datos
            let mejorAlumno = students[datosMejorAlumno.index];
            console.log('El alumno con las mejores notas (mejor media) és:');
            console.log(mejorAlumno);
        }
    }
}

function mostrarMejorNotaMediayAlumno(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        //Llamamos al método que nos devolverá un objeto con la nota media del mejor alumno i su indice
        let datosMejorAlumno = getMejorNotaeIndiceAlumno();
        //Si la mejor nota tiene un -1 como valor es que aun no se ha introducido ninguna nota
        if(datosMejorAlumno.mejorNota == -1){
            console.log('Aún no se ha introducido ninguna nota a ningún alumno')
        }else{
            //Accedemos al mejor alumno e imprimimos su nombre y su nota media
            let mejorAlumno = students[datosMejorAlumno.index];
            console.log('El alumno con las mejores notas (mejor media) és ' + mejorAlumno.name + ' con una media de ' + datosMejorAlumno.mejorNota);
        }
    }
}

function getMejorNotaeIndiceAlumno(){
    let arrayNotasMedias=[];
    //Recorremos el array de estudiantes
    for(let i = 0; i < students.length; i++){
        //Si el estudiante tiene alguna nota introducida...
        if(students[i].examScores.length > 0){
            //Se inicializan a 0 las variables que se usaran para hacer las medias
            let sumaNotas = 0;
            let contadorNotas = 0;
            //Se recorren las notas de este estudiante y se van sumando para calcular la media
            for(let j = 0; j < students[i].examScores.length; j++){
                sumaNotas += students[i].examScores[j];
                contadorNotas++;
            }
            //Se añade al array de medias la media del alumno (la suma de las notas entre el total de notas)
            arrayNotasMedias.push((sumaNotas/contadorNotas).toFixed(2));
        //Si el estudiante no tiene ninguna nota introducida, añadimos un -1 (controlamos así si no hay notas introducidas)
        }else{
            arrayNotasMedias.push(-1);
        }
    }
    //Inicializamos la un objeto que contendrá la primera nota del array y la variable que almacenará el indice del mejor alumno
    let datosMejorAlumno = {
        mejorNota : arrayNotasMedias[0],
        index : 0
    }
    //Recorremos todas las notas para compararlas y acceder a la más alta
    for(let i = 0; i < arrayNotasMedias.length; i++){
        if(datosMejorAlumno.mejorNota < arrayNotasMedias[i]){
            datosMejorAlumno.mejorNota = arrayNotasMedias[i];
            datosMejorAlumno.index = i;
        }
    }
    return datosMejorAlumno;
}

function addPuntoExtra(){
    //Añadir un punto extra a cada nota existente de todos los alumnos. Recordad que la nota máxima posible es 10. Si los alumnos aún no tienen registrada ninguna nota, les pondremos un 10.
    if(students.length == 0){
        console.log('No hay alumnos en clase')
    }else{

    }
}

runApp();
