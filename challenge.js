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
    //OPCIONAL
    + '\n16- Mostrar el alumno de la clase con las mejores notas.' 
    + '\n17- Mostrar la nota media más alta de la clase y el nombre del alumno al que pertenece.'
    + '\n18- Añadir un punto extra a cada nota existente de todos los alumnos. Si aún no tienen registrada ninguna nota, se les otorgará un 10.\n'
    + '\nPara salir de la aplicación pulse cualquier número excepto números entre 1 y 18.\n' 

//Configuramos la utilidad de Node para que los datos se pidan y se muestren por consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function calculateRandomNumber(min, max){
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

//Función flecha. Comprueva si el número introducido por el usuario es un número entero o no
const isInt = (str) => {
    const integer = parseInt(str); //Si no puede parsear a entero porque no es un número integer, devuelve un NaN
    if(Number.isNaN(integer)){ //La clase Number tiene el método isNaN. Devuelve true si no lo es
        return false 
    } else {
        return true
    }
}

function getOptionFromConsole(){
    const promise = new Promise((resolve, reject) => {
        //El question nos permite hacer una pregunta por consola al usuario
        rl.question(mensaje + '\nIntroduce la opción que desea ejecutar (número entero): ', (option) =>{
            rl.pause(); //Pausamos la referencia readLine una vez responda para que no se quede colgado
            if(isInt(option)){
                option = parseInt(option);
                resolve(option);
            }else{
                reject('Necesita introducir un número entero.')
            }
        })
    })
    return promise;
}

async function runApp(){
    let optionFromConsole;
    const MIN_OPTIONS = 1;
    const MAX_OPTIONS = 18;

    do{
        try {
            optionFromConsole = await getOptionFromConsole();
        } catch (error) { //Si la promesa se rechaza, se ejecuta el catch 
            console.log(error) //Imprimimos el error que envia el reject
            process.exit(0); //Matamos con esta linea el proceso de node. Necesario para finalizar el programa.
        }
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

            default:
                console.log('Muchas gracias por usar la aplicación. \n¡Hasta pronto!')
                rl.close() //Cerramos la referencia readLine una vez se finalice la aplicación
                break;   
        }
    //Condición para continuar: Que siga mientras "la opción sea mayor o igual al mínimo" Y "sea menor o igual que el máximo"
    }while ((optionFromConsole >= MIN_OPTIONS) && (optionFromConsole <= MAX_OPTIONS)) 
}

function mostrarTabla(){
    if(students.length == 0){
        console.log('No hay alumnos introducidos');
    }else{
        console.table(students);
    }
}

function mostrarTotalAlumnos(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        console.log('Hay un total de ' + students.length + ' alumnos en clase.');
    }
}

function mostrarNombresAlumnos(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        for(let i = 0; i < students.length; i++)
            console.log(students[i].name);
    }
}

function eliminarUltimoAlumno(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
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
        let index = calculateRandomNumber(0, students.length - 1);
        console.log(index);
        students.splice(index, 1);
        mostrarTabla();
    }
}

function mostrarDatosChicas(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        for(let i = 0; i < students.length; i++){
            if(students[i].gender == 'female'){
                console.log(students[i]);
            }
        }
    }
}

function mostrarTotalChicosyChicas(){
    let totalChicos = 0;
    let totalChicas = 0;
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        for(let i = 0; i < students.length; i++){
            if(students[i].gender == 'female'){
                totalChicas++;
            }else if(students[i].gender == 'male'){
                totalChicos++;
            }
        }
        console.log(`Chicos en la clase: ${totalChicos} \nChicas en la clase: ${totalChicas}`);
    }
}

function isTodasChicas(){
    let todasChicas = true;
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        for(let i = 0; i < students.length; i++){
            if(students[i].gender == 'male'){
                todasChicas = false;
            }
        }    
        console.log('En la clase son todas chicas? ' + todasChicas);
    }
}

function mostrarNombres20_25(){
    let alumnosJovenes = [];
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        for(let i = 0; i < students.length; i++){
            if((students[i].age >= 20) && (students[i].age <= 25)){
                alumnosJovenes.push(students[i].name);
            }
        }
        if(alumnosJovenes.length == 0){
            console.log('No hay ningún alumno que tenga entre 20 y 25 años');
        }else{
            for(let i = 0; i < alumnosJovenes.length; i++){
                console.log(alumnosJovenes[i]);
            }
        }
    }
}

function addNuevoAlumno(){

    let randomGender = calculateRandomNumber(0, availableGenders.length - 1);
    let randomAge = calculateRandomNumber(20, 50);
    let randomNameIndex = 0;
    let randomName;

    if(randomGender == 0){
        randomNameIndex = calculateRandomNumber(0, availableMaleNames.length - 1);
        randomName = availableMaleNames[randomNameIndex];
    }else if(randomGender == 1){
        randomNameIndex = calculateRandomNumber(0, availableFemaleNames.length - 1);
        randomName = availableFemaleNames[randomNameIndex];
    }

    let nuevoAlumno = {
        age: randomAge,
        examScores: [],
        gender: availableGenders[randomGender],
        name: randomName
    }

    students.push(nuevoAlumno);
    mostrarTabla();
}

function mostrarAlumnoMasJoven(){
    //Inicializamos la variable con el primer estudiante
    let alumnoMasJoven = students[0];
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        for(let i = 0; i < students.length; i++){
            if(students[i].age < alumnoMasJoven.age){
                alumnoMasJoven = students[i];
            }
        }
        console.log(alumnoMasJoven.name);
    }
}

function mostrarEdadMediaTotal(){
    let edadTotal = 0;
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        for(let i = 0; i < students.length; i++){
            edadTotal += students[i].age;
        }
        let edadMediaTotal = edadTotal/students.length;
        //Redondeamos a 2 decimales
        console.log(edadMediaTotal.toFixed(0));
    }
}

function mostrarEdadMediaChicas(){
    let edadChicas = 0;
    let contador = 0;
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        for(let i = 0; i < students.length; i++){
            if(students[i].gender == 'female'){
                edadChicas += students[i].age;
                contador++;
            }
        }
        let edadMediaChicas = edadChicas/contador;
        console.log(edadMediaChicas.toFixed(0));
    }
}

function addNuevaNota(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        for(let i = 0; i < students.length; i++){
            let nuevaNota = calculateRandomNumber(0, 10);
            students[i].examScores.push(nuevaNota);
        }
        mostrarTabla();
    }
}

function ordenarAlfabeticamente(){
    if(students.length == 0){
        console.log('No hay alumnos en clase');
    }else{
        let arrayOrdenado = students.sort((x,y) =>{
            return x.name.localeCompare(y.name);
        })
         console.table(arrayOrdenado);
    }
}

function mostrarMejorAlumno(){
    //Mostrar por consola el alumno de la clase con las mejores notas.
    //El alumno con mejores notas es aquel cuyo sumatorio de todas sus notas es el valor más alto de todos.
    if(students.length == 0){
        console.log('No hay alumnos en clase')
    }else{

    }
}

function mostrarMejorNotaMediayAlumno(){
    //Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece.
    if(students.length == 0){
        console.log('No hay alumnos en clase')
    }else{

    }
}

function addPuntoExtra(){
    if(students.length == 0){
        console.log('No hay alumnos en clase')
    }else{

    }
}

runApp();
