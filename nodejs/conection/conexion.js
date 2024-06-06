var mysql = require('mysql2');

const database = {
    host: 'localhost',
    database: 'Facturacion_DB',
    user: 'root',
    password: ''
}

const conexion = mysql.createConnection(database)

conexion.connect(function(err) {
    if (err){
        throw err;
    }else{
        console.log(`🟢 Conexion con la base de datos ${database.database} fue exitosa`);
    }
})

process.on('SIGINT', () => {
    console.log(`🔴 Se cerro la conexion con la base de datos exitosamente`);
    conexion.end();
})

module.exports = conexion;

