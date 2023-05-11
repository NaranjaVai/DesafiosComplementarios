import nodemailer from 'nodemailer';

const mailConfig = {
    service: 'gmail',
    auth :{
        user: 'oangel0590@gmail.com',
        pass: 'ojhufheglrisrosh'
    }
}
const mailContent = {
    from: 'oangel0590@gmail.com',
    to : 'oangel0590@gmail.com',
    subject: 'Test Mail from Me',
    text: 'Probanding'
}


const sendMail = async (config, gmailConfig) => {
    const transporter = nodemailer.createTransport(config);
    let resp = await transporter.sendMail(gmailConfig);
    console.log(resp);
}

sendMail(mailConfig,mailContent);