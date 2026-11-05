


const formulario = document.getElementById("añadir-tareas");
const entradaTarea = document.getElementById("entrada-tarea");
const listaTareas = document.getElementById("lista-tareas");


let tareas = [];



function renderizarTareas() {

    // Limpiamos la lista antes de volver a dibujarla.
    listaTareas.innerHTML = "";

    // Separamos las tareas pendientes y completadas.
    const pendientes = tareas.filter(tarea => !tarea.completada);
    const completadas = tareas.filter(tarea => tarea.completada);

    // Unimos ambas listas: primero pendientes y luego completadas.
    const tareasOrdenadas = [...pendientes, ...completadas];

    // Recorremos cada tarea.
    tareasOrdenadas.forEach((tarea) => {

        // Creamos un elemento de lista.
        const elemento = document.createElement("li");

        // Creamos la casilla para marcar la tarea.
        const casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.classList.add("casilla-tarea");

        // Indicamos si la tarea está completada.
        casilla.checked = tarea.completada;

        // Creamos el texto de la tarea.
        const texto = document.createElement("span");
        texto.textContent = tarea.descripcion;
        texto.classList.add("texto-tarea");

        // Si está completada, agregamos una clase CSS.
        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        // Evento para marcar o desmarcar una tarea.
        casilla.addEventListener("change", function () {

            tarea.completada = casilla.checked;

            // Volvemos a mostrar las tareas actualizadas.
            renderizarTareas();
        });

        // Creamos el botón para eliminar.
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "🗑";
        botonEliminar.classList.add("boton-eliminar");

        // Evento para eliminar una tarea.
        botonEliminar.addEventListener("click", function () {

            tareas = tareas.filter(
                elementoTarea => elementoTarea !== tarea
            );

            renderizarTareas();
        });

        // Agregamos los elementos a la lista.
        elemento.appendChild(casilla);
        elemento.appendChild(texto);
        elemento.appendChild(botonEliminar);

        listaTareas.appendChild(elemento);
    });
}



formulario.addEventListener("submit", function (evento) {

    // Evitamos que el formulario recargue la página.
    evento.preventDefault();

    // Obtenemos el texto escrito y eliminamos espacios sobrantes.
    const descripcion = entradaTarea.value.trim();

    // Comprobamos que no esté vacío.
    if (descripcion === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    // Creamos un nuevo objeto de tarea.
    const nuevaTarea = {
        descripcion: descripcion,
        completada: false
    };

    // Guardamos la tarea en el arreglo.
    tareas.push(nuevaTarea);

    // Limpiamos el campo de escritura.
    entradaTarea.value = "";

    // Actualizamos la lista.
    renderizarTareas();
});
