const transport = require("./mailer");
const path = require("path");


module.exports = async (to, subject, html) => {
  try {
    await transport.sendMail({
  from: process.env.GMAIL_USER,
  to,
  subject,
  html,
  attachments: [
    {
      filename: "logo.jpeg",
      path: path.join(__dirname, "../media/logo.jpeg"),
      cid: "pulsify-logo",
    },
  ],
});

  } catch (error) {
    throw new Error("Error sending mail", error.message);
  }
};
