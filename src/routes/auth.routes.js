const express = require('express')
const router = express.Router()

const {
    registerController, 
    loginController, 
    resendVerificationEmailController, 
    completeRegistrationController,
    tokenControlTestController,
    forgotPasswordController,
    forgotPasswordCheckCodeController,
    resetPasswordController
} = require('../controllers/auth.controller')


const {registerValidation,loginValidation} = require('../middlewares/validations/auth.validations')

const authMiddlewares = require('../middlewares/auth.middlewares')


router.post('/login', loginValidation, loginController)
router.post('/register', registerValidation, registerController)
router.post('/complete-registration', completeRegistrationController)
router.post('/resend-verification-email', resendVerificationEmailController)

router.post('/forgot-password', forgotPasswordController)
router.post('/forgot-password-check', forgotPasswordCheckCodeController)
router.post('/reset-password', resetPasswordController)

router.get('/token-control-test', authMiddlewares.checkToken, tokenControlTestController)

module.exports = router