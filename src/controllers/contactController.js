const nodemailer = require('nodemailer');

exports.sendContactEmail = async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'projobsaddmin2025@gmail.com',
      pass: 'zdeg uufu walk heck' 
    }
  });

  const mailOptions = {
    from: correo,
    to: 'projobsaddmin2025@gmail.com',
    subject: `Mensaje de contacto de ${nombre}`,
    text: mensaje
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render('index', { mensaje: 'Mensaje enviado con éxito', error: null });
  } catch (error) {
    console.error(error);
    res.render('index', { mensaje: null, error: 'Error al enviar el mensaje' });
  }
};
