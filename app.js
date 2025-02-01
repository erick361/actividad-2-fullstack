// app.js

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('nuevaTarea');
    const botonAgregar = document.getElementById('agregarTarea');
    const listaTareas = document.getElementById('listaTareas');

    class Tarea {
        constructor(nombre) {
            this.nombre = nombre;
            this.completa = false;
        }

        actualizarEstado() {
            this.completa = !this.completa;
        }

        editarContenido(nuevoNombre) {
            this.nombre = nuevoNombre;
        }
    }

    class GestorDeTareas {
        constructor() {
            this.tareas = [];
        }

        agregarTarea(nombre) {
            const nuevaTarea = new Tarea(nombre);
            this.tareas.push(nuevaTarea);
        }

        eliminarTarea(indice) {
            this.tareas.splice(indice, 1);
        }

        obtenerTareas() {
            return this.tareas;
        }
    }

    const gestorDeTareas = new GestorDeTareas();

    botonAgregar.addEventListener('click', () => {
        const tareaTexto = input.value.trim();
        if (tareaTexto !== '') {
            gestorDeTareas.agregarTarea(tareaTexto);
            input.value = '';
            actualizarListaTareas();
        } else {
            alert('No se puede agregar una tarea vacía.');
        }
    });

    function actualizarListaTareas() {
        listaTareas.innerHTML = '';
        gestorDeTareas.obtenerTareas().forEach((tarea, indice) => {
            const li = document.createElement('li');
            li.textContent = tarea.nombre;

            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.addEventListener('click', () => {
                const nuevoTexto = prompt('Editar tarea:', tarea.nombre);
                if (nuevoTexto) {
                    tarea.editarContenido(nuevoTexto);
                    actualizarListaTareas();
                }
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
                gestorDeTareas.eliminarTarea(indice);
                actualizarListaTareas();
            });

            li.appendChild(botonEditar);
            li.appendChild(botonEliminar);
            listaTareas.appendChild(li);
        });
    }
});
