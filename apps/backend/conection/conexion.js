import mysql from 'mysql2/promise';

const database = {
    host: 'database-dc',
    port: 3306,
    database: 'BDC_DECRETOS',
    user: 'root',
    password: '',
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