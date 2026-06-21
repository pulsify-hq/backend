const nodemailer = require("nodemailer");

try {
    
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.APP_PASSWORD
    }
});

} catch (error) {
   throw new Error("Error creating mail transport", error.message);
}

module.exports = transporter