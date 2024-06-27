import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "sistemadigitacionddne@gmail.com",
    pass: "yteidrhnqzzoydsv",
  },
});

transporter.verify()
  .then(() => {
    console.log('🟢 El correo se conectó correctamente');
  })
  .catch((error) => {
    console.error('🔴 Error al conectar con el correo:', error);
  });

transporter.on('error', (error) => {
  console.error('🔴 Error en el transporter:', error);
});

export default transporter