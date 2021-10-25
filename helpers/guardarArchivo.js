const fs = require('fs')

const archivo = './db/data.json';

const guardarDatabase = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDatabase = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    // console.log(info) // data en string por el stringify
    const data = JSON.parse(info);
    // console.log(data) // Al ver los colores se puede ver que es un array json y no un string
    return data;
}

module.exports = {
    guardarDatabase,
    leerDatabase
}