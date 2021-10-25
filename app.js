// importacione de terceros
require('colors');
const { guardarDatabase, leerDatabase } = require('./helpers/guardarArchivo');
// importacione propias
// const { mostrarMenu, pausa } = require('./helpers/mensajes');
const { inquirerMenu, pausa, leerInput, listadoBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
// const Tarea = require('./models/tarea');
const Tareas = require('./models/Tareas');

console.clear()


const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    const tareasdb = leerDatabase();

    if (tareasdb) {
        tareas.cargartareasFromArray(tareasdb)
    }

    do {
        // opt = await mostrarMenu();
        opt = await inquirerMenu();
        // console.log({ opt })

        switch (opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc);
                break;
            case '2':
                // listar tarea
                // console.log(tareas.listadoArr)
                tareas.listadoCompleto()
                break;
            case '3':
                // listar tarea Completa
                // console.log(tareas.listadoArr)
                tareas.listarPendientesCompletados(true)
                break;
            case '4':
                // listar tarea Pendiente
                // console.log(tareas.listadoArr)
                tareas.listarPendientesCompletados(false);
                break;
            case '5':
                // Completar tareas
                // console.log(tareas.listadoArr)
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                // Borrar tarea
                // console.log(tareas.listadoArr)
                const id = await listadoBorrar(tareas.listadoArr);
                if (id !== '0') {
                    //confirmar seguro
                    const borrarConfirm = await confirmar('¿Esta seguro de borrar?')
                    if (borrarConfirm) {
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada correctamente')
                    }
                    break;
                }
        }

        guardarDatabase(tareas.listadoArr)
        // const tareas= new Tareas();
        // const tarea = new Tarea('Comprar comida');
        // tareas._listado[tarea.id] = tarea
        // console.log(tareas)
        if (opt !== '0') await pausa();

    } while (opt !== '0')

}

main();