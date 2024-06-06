var mysql = require('mysql2');

const database = {
    host: '93.188.166.96',
    database: 'Facturacion_DB',
    user: 'user',
    password: 'user123'
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

