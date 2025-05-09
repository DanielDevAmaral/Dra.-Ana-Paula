const nodemailer = require('nodemailer');

// Configuração do transportador com SMTP do Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Configure no arquivo .env
        pass: process.env.EMAIL_PASS, // Configure no arquivo .env
    },
});

// Função para enviar e-mail
const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log('E-mail enviado:', info.response);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
};

module.exports = sendEmail;
