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

const mensaje = 'Para salir de la aplicación pulse cualquier número excepto números entre 1 y 18.\n' 
    + '\n\tMENÚ\n'
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
    + '\n15- Mostrar los nombres de los alumnos ordenados alfabéticamente según su nombre.'
    //OPCIONAL
    + '\n16- Mostrar el alumno de la clase con las mejores notas.' 
    + '\n17- Mostrar la nota media más alta de la clase y el nombre del alumno al que pertenece.'
    + '\n18- Añadir un punto extra a cada nota existente de todos los alumnos. Si aún no tienen registrada ninguna nota, se les otorgará un 10.\n'

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
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 12:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 13:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 14:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 15:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 16:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 17:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 18:
                console.log('Has escogido la opción ' + optionFromConsole)
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
        console.log('No hay alumnos introducidos\n');
    }else{
        console.table(students);
    }
}

function mostrarTotalAlumnos(){
    if(students.length == 0){
        console.log('No hay alumnos en clase\n');
    }else{
        console.log('Hay un total de ' + students.length + ' alumnos en clase.\n');
    }
}

function mostrarNombresAlumnos(){
    if(students.length == 0){
        console.log('No hay alumnos en clase\n');
    }else{
        for(let i = 0; i < students.length; i++)
            console.log(students[i].name);
    }
}

function eliminarUltimoAlumno(){
    if(students.length == 0){
        console.log('No hay alumnos en clase\n')
    }else{
        console.table(students);
        students.pop();
        console.table(students);
    }
}

function eliminarAlumnoAleatorio(){
    if(students.length == 0){
        console.log('No hay alumnos en clase\n')
    }else{
        console.table(students);
        let index = calculateRandomNumber(0, students.length - 1)
        console.log(index);
        students.splice(index, 1);
        console.table(students);
    }
}

function mostrarDatosChicas(){
    if(students.length == 0){
        console.log('No hay alumnos en clase\n')
    }else{
        console.log('Hay un total de ' + students.length + ' alumnos en clase.')
    }
}

function mostrarTotalChicosyChicas(){
    if(students.length == 0){
        console.log('No hay alumnos en clase\n')
    }else{
        console.log('Hay un total de ' + students.length + ' alumnos en clase.')
    }
}

function isTodasChicas(){
    if(students.length == 0){
        console.log('No hay alumnos en clase\n')
    }else{
        console.log('Hay un total de ' + students.length + ' alumnos en clase.')
    }
}

function mostrarNombres20_25(){
    if(students.length == 0){
        console.log('No hay alumnos en clase\n')
    }else{
        console.log('Hay un total de ' + students.length + ' alumnos en clase.')
    }
}

function addNuevoAlumno(){
    if(students.length == 0){
        console.log('No hay alumnos en clase\n')
    }else{
        console.log('Hay un total de ' + students.length + ' alumnos en clase.')
    }
}

runApp();
