const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "facturacionddne@gmail.com",
    pass: "jhxfdmgezbogxrkc",
  },
});

transporter.verify()
  .then(() => {
    console.log('🟢 El correo se conectó correctamente');
  })
  .catch((error) => {
    console.error('🔴 Error al conectar con el correo:', error);
  });

module.exports = { transporter };
