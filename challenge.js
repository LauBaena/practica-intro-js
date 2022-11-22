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

const mensaje = 'Para salir de la aplicación pulse cualquier número excepto números entre 1 y 18.' 
    + '\nMENÚ:'
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
    + '\n18- Añadir un punto extra a cada nota existente de todos los alumnos. Si aún no tienen registrada ninguna nota, se les otorgará un 10.'

//Configuramos la utilidad de Node para que los datos se pidan y se muestren por consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Función flecha. Comprueva si el número introducido por el usuario es un número entero o no
const isInt = (str) => {
    const integer = parseInt(str); //Si no puede parsear a entero porque no es un número integer, devuelve un NaN
    if(Number.isNaN(integer)){ //La clase Number tiene el método isNaN. Devuelve true si no lo es
        return false 
    } else {
        return true
    }
}

//Productor
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
                console.log('Has escogido la opción ' + optionFromConsole)
                break;
            case 2:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;
            case 3:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;
            case 4:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;
            case 5:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;
            case 6:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 7:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 8:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 9:
                console.log('Has escogido la opción ' + optionFromConsole)
                break;            
            case 10:
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
                break;   
        }
    //Condición para continuar: Que siga mientras "la opción sea mayor o igual al mínimo" Y "sea menor o igual que el máximo"
    }while ((optionFromConsole >= MIN_OPTIONS) && (optionFromConsole <= MAX_OPTIONS)) 
}

//Imprime una tabla
console.table(students)

runApp();

        /*
        if (secretNumber === optionFromConsole){
            rl.close() //Cerramos la referencia readLine una vez se finalice la aplicación
            console.log('Has acertado, es correcto');
        }else{
            if(secretNumber > optionFromConsole){
                console.log('El número secreto es mayor');
            }else if(secretNumber < optionFromConsole){
                console.log('El número secreto es menor');
            }
        }
        if(counter === MAX_TRIES){
            console.log('Has alcanzado el número máximo de intentos');
        }else{
            let diff = MAX_TRIES - counter;
            console.log(`Te quedan ${diff} intentos`)
        }
        */