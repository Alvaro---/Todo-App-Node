const Tarea = require("./tarea")

class Tareas {
    _listado = {}

    get listadoArr() {
        const listado = [];
        //Extraer todas las llaves del objeto
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargartareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        //Si fuera un array se lo manejaria con .push. pero al ser objeto se puede usar su valor como propiedad
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log()
        let listado = '';
        this.listadoArr.forEach((tarea, index) => {
            const i = `${index + 1}.-`.green;
            listado += `${i} ${tarea.desc} :: ${tarea.completadoEn !== null ? 'Completado'.green : 'Pendiente'.red} \n`
        })
        // otra forma seria hacer un clg dentro del foreach en lugar de la variable listado. 
        //Tambien deconstruir const {desc, completadoEn} = tarea dentro del forEach para usarlos valores directamente
        console.log(listado)
    }

    listarPendientesCompletados(completados = true) {
        console.log()
        let index = 1;
        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;
            if (completados) {
                if (completadoEn) {
                    console.log(`${index.toString().green + '.-'.green} ${desc} :: ${completadoEn.toString().blue}`);
                    index++;
                }
            }
            else {
                if (!completadoEn) {
                    console.log(`${index.toString().green + '.-'.green} ${desc}`);
                    index++;
                }
            }
        })
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) { //si no existe en el arreglo enviado
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}

module.exports = Tareas