const inquirer = require('inquirer')
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.-'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.-'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.-'.green} Listar tareas completas`
            },
            {
                value: '4',
                name: `${'4.-'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.-'.green} Compeltar tarea`
            },
            {
                value: '6',
                name: `${'6.-'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.-'.green} Salir`
            }
        ]
    }
]

const pausaProps = [
    {
        type: 'input',
        name: 'pausa',
        message: `Presiones ${'ENTER'.green} para continuar `,
    }
]

const inquirerMenu = async () => {
    console.clear()
    console.log('========================'.green);
    console.log(' Seleccione una opción'.white);
    console.log('========================\n'.green);

    // const opt = await inquirer.prompt(preguntas) // la funcion retorna un objeto opcion: valor.  Para recoger solo el valor podriamos usar la variable opcion. y al tener el mismo nombre se puede desetructurar
    const { opcion } = await inquirer.prompt(preguntas) //opcion por el name del prop
    return opcion
}

const pausa = async () => {
    // las propiedades podriane star internas aca. No necesita retornar nada
    // const { pausa } = await inquirer.prompt(pausaProps);
    console.log('\n')
    await inquirer.prompt(pausaProps);
    // return pausa
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Ingresa una tarea'
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc
}


const listadoBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {

        const i = `${index + 1}.-`.green
        return {
            value: tarea.id,
            name: `${i} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.-'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: '¿Que tarea desea borrar?'.red,
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas)
    return id

}


const confirmar = async (message = '') => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}


const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {

        const i = `${index + 1}.-`.green
        return {
            value: tarea.id,
            name: `${i} ${tarea.desc}`,
            checked: tarea.completadoEn ? true : false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccionar',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(preguntas)
    return ids

}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoBorrar,
    confirmar,
    mostrarListadoChecklist 
}