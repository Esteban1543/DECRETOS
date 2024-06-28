import mysql from 'mysql2/promise';

const database = {
    host: 'ddnepruebas.online',
    database: 'decretos_db',
    user: 'user',
    password: 'user123',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
}

let conexion;

try {
    conexion = await mysql.createPool(database);
    console.log(`🟢 Conexion con la base de datos ${database.database} fue exitosa`);
} catch (error) {
    console.log(error)
}

export default conexion;

