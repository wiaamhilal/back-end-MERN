const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "weaam224112@gmail.com", //sender
        pass: "ohnp jeix dehf swlp",
      },
    });
    const mailOptions = {
      from: "weaam224112@gmail.com", // sender
      to: userEmail,
      subject: subject,
      html: htmlTemplate,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("email sent: " + info.response);
  } catch (error) {
    console.log(error);
    throw new Error("internal server error (nodemailer)");
  }
};

//process.env.APP_EMAIL_ADDTESS
//process.env.APP_EMAIL_PASSWORD