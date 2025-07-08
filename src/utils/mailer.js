const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const enviarCorreoBienvenida = async (correoDestino, nombreUsuario) => {
  try {
    const info = await transporter.sendMail({
      from: `"ProJobs 👷‍♂️" <${process.env.EMAIL_USER}>`,
      to: correoDestino,
      subject: "Bienvenido a ProJobs",
      html: `
        <h2>Hola ${nombreUsuario} 👋</h2>
        <p>¡Gracias por registrarte en nuestra plataforma!</p>
        <p>Esperamos que encuentres grandes oportunidades laborales aquí.</p>
        <br/>
        <small>No respondas a este correo. Es generado automáticamente.</small>
      `
    });
    console.log("Correo de bienvenida enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar correo de bienvenida:", error);
  }
};

const enviarCorreoRecuperacion = async (correoDestino, linkRecuperacion) => {
  try {
    const info = await transporter.sendMail({
      from: `"ProJobs 👷‍♂️" <${process.env.EMAIL_USER}>`,
      to: correoDestino,
      subject: "Recupera tu contraseña",
      html: `
        <h2>Solicitud de recuperación de contraseña</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${linkRecuperacion}">${linkRecuperacion}</a>
        <br/><br/>
        <small>Este enlace expirará en 1 hora. Si no solicitaste este cambio, ignora este correo.</small>
      `
    });
    console.log("Correo de recuperación enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar correo de recuperación:", error);
  }
};

module.exports = {
  enviarCorreoBienvenida,
  enviarCorreoRecuperacion
};
