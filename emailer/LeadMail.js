const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
require('dotenv').config()

const sendMail = async(email, name, interest)=>{
    try
    {
        let testAccount = await nodemailer.createTestAccount();
        
        var transporter = nodemailer.createTransport(
            {
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_ADD,//testAccount.user,
                    pass: process.env.EMAIL_PASS//testAccount.pass,
                },
            }
        );

     

        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./emailer/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./emailer/'),
        };
        
        // use a template file with nodemailer
        transporter.use('compile', hbs(handlebarOptions))
        
        
        var mailOptions = {
            from: `"Travelers" <${process.env.EMAIL_ADD}>`, // sender address
            to: `${email}`, // list of receivers
            subject: 'Welcome! Hey there..',
            template: 'email', // the name of the template file i.e email.handlebars
            context:{
                name: `${name}`, // replace {{name}} with Adebola
                interest: `${interest}`
            }
        };
        
        // trigger the sending of the E-mail
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            console.log("Message sent: %s", info.messageId);
       
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        });
     
    }
    catch(err)
    {
        console.log(err) 
    }
}

module.exports = {sendMail}