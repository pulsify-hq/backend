const transport = require("./mailer");

module.exports = async(to, subject, html) =>{
    try {
        
  await  transport.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        html
    });

    } catch (error) {
        throw new Error("Error sending mail", error.message);
    }
}