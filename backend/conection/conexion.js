import mysql from 'mysql2/promise';

const database = {
    host: 'localhost',
    database: 'decretos_db',
    user: 'root',
    password: ''
}

let conexion;

try {
    conexion = await mysql.createConnection(database);
    console.log(`🟢 Conexion con la base de datos ${database.database} fue exitosa`);
} catch (error) {
    console.log(error)
}

export default conexion;

