import nodeMailer from 'nodemailer';

 const sendEmail = async function (email, subject, message) {

        const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
        });
    
      
     await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
        html: `<p>${message}</p>`, // html body
      });
}
      console.log('Email sent successfully');

      export default sendEmail;