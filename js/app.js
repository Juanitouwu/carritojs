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

    //elimina perro del carrito
    carrito.addEventListener('click', elimina);

    //elimina todo del carrito
    vaciarCarrito.addEventListener('click', eliminarTodosperros);

    //al cargar documento, muestra local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}




//FUNCIONEs
//funcion que añade el perro al carrito
function comprarperros(e) {
    e.preventDefault();
    //delegation para class agregar-carrito ( clase de los botones para agregar al carrito )
    if(e.target.classList.contains('agregar-carrito')) {
        const perro = e.target.parentElement.parentElement;
        //para seleccionar toda la información del perro en cuestión
        leerDatosperro(perro);
        //se llama a la función que nos proveerá de los datos del perro para agregar al carrito
    };
}



//Lee los datos del perro
function leerDatosperro(perro) {
    //se crea un objeto que almacene toda la informacion requerida del perro
    const perroInfo = {
        imagen: perro.querySelector('img').src,
        titulo: perro.querySelector('h4').textContent,
      
        id: perro.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(perroInfo); 
}

//muestra el perro seleccionado en el carrito en el DOM

function insertarCarrito(perro) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${perro.imagen}" width=100 /></td>
        <td> ${perro.titulo}</td>
      
        <td> <a href="#" class="borrar-perro" data-id="${perro.id}">X</a></td>
    `;

    listaperros.appendChild(row);
    guardarperroLocalStorage(perro);
}

//elimina perro del carrito en el DOM
function eliminaperro(e) {
    e.preventDefault();
    let perro, perroId;
    if(e.target.classList.contains('borrar-perro')) { // delegas el listener hacia la clase
        //borrar-perro que la posee el boton "x" de eliminar
        e.target.parentElement.parentElement.remove(); //remueves todo desde el padre 
        //del padre de la "x"(todo el item del perro en el carrito);
        perro = e.target.parentElement.parentElement;
        perroId= perro.querySelector('a').getAttribute('data-id');
        console.log(perroId);
    }

    eliminarperroLocalStorage(perroId);
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

function guardarperroLocalStorage(perro) {
    let perros;
    //toma los valores del local storage si existen, si no retorna un array vacio
    perros = obtenerperroLocalStorage();

    //el perro que se selecciona se agrega al arreglo del LocalStorage
    perros.push(perro);

    //se devuelve el nuevo array al localStorage con la información actualizada
    localStorage.setItem('perros', JSON.stringify(perros));
}


//comprueba que hay elementos en local Storage
function obtenerperroLocalStorage() {
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

    perrosLS = obtenerperroLocalStorage();

    perrosLS.forEach(function(perro) {
        const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${perro.imagen}" width=100 /></td>
        <td> ${perro.titulo}</td>
    
        <td> <a href="#" class="borrar-perro" data-id="${perro.id}">X</a></td>
    `;

    listaperros.appendChild(row);
    })
    
}


//elimina el perro por el ID de localStorage
function eliminarperroLocalStorage(perro) {
    let perrosLS;

    perrosLS = obtenerperroLocalStorage();

    perrosLS.forEach(function(perroLS,index) {
        if(perroLS.id === perro) {
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