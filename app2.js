//Variables
const carrito = document.getElementById('carrito');
const perros = document.getElementById('lista-perros');
const listaperros = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');





//Listeners

//Acordase de llamar a la función de eventListeners, si no, no funciona desde el principio!!
cargarEventListeners();// <<<<--------

function cargarEventListeners() {
    //dispara cuando se presiona agregar carrito
    perros.addEventListener('click',comprarperros);

    //elimina perros del carrito
    carrito.addEventListener('click', eliminaperros);

    //elimina todo del carrito
    vaciarCarrito.addEventListener('click', eliminarTodosperros);

    //al cargar documento, muestra local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}




//FUNCIONEs
//funcion que añade el perros al carrito
function comprarperros(e) {
    e.preventDefault();
    //delegation para class agregar-carrito ( clase de los botones para agregar al carrito )
    if(e.target.classList.contains('agregar-carrito')) {
        const perros = e.target.parentElement.parentElement;
        //para seleccionar toda la información del perros en cuestión
        leerDatosperros(perros);
        //se llama a la función que nos proveerá de los datos del perros para agregar al carrito
    };
}



//Lee los datos del perros
function leerDatosperros(perros) {
    //se crea un objeto que almacene toda la informacion requerida del perros
    const perrosInfo = {
        imagen: perros.querySelector('img').src,
        titulo: perros.querySelector('h4').textContent,
        precio: perros.querySelector('.precio span').textContent,
        id: perros.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(perrosInfo); 
}

//muestra el perros seleccionado en el carrito en el DOM

function insertarCarrito(perros) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${perros.imagen}" width=100 /></td>
        <td> ${perros.titulo}</td>
      
        <td> <a href="#" class="borrar-perros" data-id="${perros.id}">X</a></td>
    `;

    listaperros.appendChild(row);
    guardarperrosLocalStorage(perros);
}

//elimina perros del carrito en el DOM
function eliminaperros(e) {
    e.preventDefault();
    let perros, perrosId;
    if(e.target.classList.contains('borrar-perros')) { // delegas el listener hacia la clase
        //borrar-perros que la posee el boton "x" de eliminar
        e.target.parentElement.parentElement.remove(); //remueves todo desde el padre 
        //del padre de la "x"(todo el item del perros en el carrito);
        perros = e.target.parentElement.parentElement;
        perrosId= perros.querySelector('a').getAttribute('data-id');
        console.log(perrosId);
    }

    eliminarperrosLocalStorage(perrosId);
}

//funcion que elimina todos los elementos del carrito en el DOM

function eliminarTodosperros(e) {
    //forma 1
    //listaperros.innerHTML = '';
    //forma 2
    while(listaperros.firstChild) {
        listaperros.removeChild(listaperros.firstChild);
    }

    //elimina todos los perros del LocalStorage
    vaciarLocalStorage();


    return false;
}

//LOCAL STORAGES FUNCTIONS

function guardarperrosLocalStorage(perros) {
    let perros;
    //toma los valores del local storage si existen, si no retorna un array vacio
    perros = obtenerperrosLocalStorage();

    //el perros que se selecciona se agrega al arreglo del LocalStorage
    perros.push(perros);

    //se devuelve el nuevo array al localStorage con la información actualizada
    localStorage.setItem('perros', JSON.stringify(perros));
}


//comprueba que hay elementos en local Storage
function obtenerperrosLocalStorage() {
    let perrosLS;
    //comprobamos si hay algo en local storage
    if(localStorage.getItem('perros') === null) {
        perrosLS = [];
    } else { //JSON.parse transforma lo que viene como string del LS, en un array.
        perrosLS = JSON.parse(localStorage.getItem('perros'));
    }
    
    return perrosLS;
}

//imprime los perros de local storage

function leerLocalStorage() {
    let perrosLS;

    perrosLS = obtenerperrosLocalStorage();

    perrosLS.forEach(function(perros) {
        const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${perros.imagen}" width=100 /></td>
        <td> ${perros.titulo}</td>
        <td> ${perros.precio}</td>
        <td> <a href="#" class="borrar-perros" data-id="${perros.id}">X</a></td>
    `;

    listaperros.appendChild(row);
    })
    
}


//elimina el perros por el ID de localStorage
function eliminarperrosLocalStorage(perros) {
    let perrosLS;

    perrosLS = obtenerperrosLocalStorage();

    perrosLS.forEach(function(perrosLS,index) {
        if(perrosLS.id === perros) {
            perrosLS.splice(index,1);
        }
    });

    console.log(perrosLS);
    //Arreglo actual al storage
    localStorage.setItem('perros', JSON.stringify(perrosLS));

}

//elimina todos los perros del Local Storage

function vaciarLocalStorage() {
    localStorage.clear();
}