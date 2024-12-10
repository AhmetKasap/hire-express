const userModel = require('../models/user.model')
const moment = require('moment')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')
const mail = require('../helpers/sendMail')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const authMiddlewares = require('../middlewares/auth.middlewares')
const hostModel = require('../models/host.model')



//* account closure 

const accountDeleteCheckCodeController = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response('null', 'not found user').notfound(res)
    
    const email = user.email

    const closureCode = crypto.randomBytes(3).toString('hex'); 
    
    let mailOption = new mail.MailOption(process.env.EMAIL_ADRESS, email, "Account Closure", `code 'myAPI'. ${closureCode}`)
    await mail.sendMail(mailOption)

    await userModel.updateOne({email}, {accountClosure : {code : closureCode, time : moment(new Date()).add(15,'minute').format('YYYY-MM-DD HH:mm:ss')}  }) //* Add 15 minutes to the current time and save it to the database.

    return new Response(true, 'A code has been sent to your email address to close your account.').ok(res)
}

const accountDeleteController = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response('null', 'not found user').notfound(res)
 

    const password = await bcrypt.compare(req.body.password, user.password)
    console.log(req.body.code, user.accountClosure.code)

    if(req.body.code !== user.accountClosure.code || password !==true) return new Response(null, 'Email, password or code incorrect').badRequest(res)

    
    const nowTime = moment(new Date()) //* current time
    const dbTime = moment(user.accountClosure.time) //* we got the time recorded in the database.
    const timeDiff = dbTime.diff(nowTime, 'minutes') //* We subtracted the current time from the time in the database. We should get -15.

    if(timeDiff >=0 && req.body.code){
        const deletedAccount = await userModel.findByIdAndDelete(user._id)
        if(deletedAccount) {
            await hostModel.deleteMany({userRef : user._id})
            return new Response(null, 'sorry you left your account has been closed').ok(res)
        }
    }
    else return new Response(false, 'Transmitted code timed out.').forbidden(res)
    
}



//* forgot password 

const forgotPasswordController = async (req, res) => {
    const email = req.body.email

    const user = await userModel.findOne({ email })

    if (!user) {throw new APIError('No such email address exists.')}

    const resetCode = crypto.randomBytes(3).toString('hex'); 
    
    let mailOption = new mail.MailOption(process.env.EMAIL_ADRESS, req.body.email, "Reset Password", `reset code 'myAPI'. ${resetCode}`)
    await mail.sendMail(mailOption)

    await userModel.updateOne({email}, {reset : {code : resetCode, time : moment(new Date()).add(15,'minute').format('YYYY-MM-DD HH:mm:ss')}  }) //* Add 15 minutes to the current time and save it to the database.

    return new Response(true, 'Your password reset code has been sent to your e-mail address').ok(res)


}

const forgotPasswordCheckCodeController = async (req,res) => {
    const email = req.body.email
    const code = req.body.code

    const user = await userModel.findOne({email})
    if(!user || code !== user.reset.code) throw new APIError('Email or code incorrect', 404)

    const nowTime = moment(new Date()) //* current time
    const dbTime = moment(user.reset.time) //* we got the time recorded in the database.
    const timeDiff = dbTime.diff(nowTime, 'minutes') //* We subtracted the current time from the time in the database. We should get -15.

    if(timeDiff >=0 && code){
        const temporaryToken = await authMiddlewares.createTemporaryToken(user)

        return new Response({temporaryToken}, 'successful, you can reset your password.').ok(res)
    }
    else return new Response(false, 'Transmitted code timed out.').forbidden(res)
    
}

const resetPasswordController = async(req,res) => {
    const password = req.body.password
    const temporaryToken = req.body.temporaryToken

    const decodedToken = await authMiddlewares.decodedTemporaryToken(temporaryToken)
    //console.log("çözümlenmiş token", decodedToken)

    if(!decodedToken) throw new APIError('not found token', 401)

    const hashPassword = await bcrypt.hash(password,10)

    await userModel.findByIdAndUpdate({_id : decodedToken._id}, {reset : {code : null, time : null}, password : hashPassword})

    return new Response(true, 'password reset successful').ok(res)
}


module.exports = {
    forgotPasswordController,
    forgotPasswordCheckCodeController,
    resetPasswordController,
    accountDeleteCheckCodeController,
    accountDeleteController
}