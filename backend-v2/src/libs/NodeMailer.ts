import nodemailer from "nodemailer"
import APIError from "../shared/utils/APIError";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
});


const sendAcountVerificationEmail = async (email : string, confirmationCode : string) : Promise<boolean> => { // email = email address to send mail to    
    const mailOptions = {
        from : process.env.EMAIL_ADRESS as string,
        to : email,
        subject : "It's great that you want to become a hire express member",
        text : `You must use the following code to complete the registration process. ${confirmationCode}`
    }
    
    const result = await transporter.sendMail(mailOptions)
    if(result) return true
    else throw new APIError("error during email sending", 500)

}

const sendInformationEmail = async() : Promise <boolean> => {
    return true
}


export {sendAcountVerificationEmail}
