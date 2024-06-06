const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {
        small: true
    });
});

client.on('ready', () => {
    console.log(`🟢 Se conectó con WhatsApp correctamente`);
});

client.on('auth_failure', msg => {
    console.error('❌ Error de autenticación:', msg);
});

client.on('disconnected', reason => {
    console.log('🔴 Cliente desconectado:', reason);
});

client.on('error', err => {
    console.error('❌ Error del cliente:', err);
});

client.initialize();

module.exports = {
    client
};