import { createTransport } from "nodemailer";

const sendOTP = async (email, otp) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    html: `<h2>Your OTP code is ${otp}</h2>`
  });

};
export default sendOTP;