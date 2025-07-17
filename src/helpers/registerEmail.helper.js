import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS
    }
})

const sendEmialOfRegister = async ({email, verifyCode}) => await transporter.sendMail({
    from: `Rolling Store Comercio  <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "EMAIL DE VERIFICACION DE CUENTA",
    html: `<h1>CODIGO PARA VERIFICAR LA CUENTA: ${verifyCode}</h1>`
})

export default sendEmialOfRegister