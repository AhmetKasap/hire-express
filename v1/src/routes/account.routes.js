const express = require('express')
const router = express.Router()
const authMiddlewares = require('../middlewares/auth.middlewares')

const {
    forgotPasswordController,
    forgotPasswordCheckCodeController,
    resetPasswordController,
    accountDeleteCheckCodeController,
    accountDeleteController
} = require('../controllers/account.controller')


router.post('/forgot-password', forgotPasswordController)
router.post('/forgot-password-check', forgotPasswordCheckCodeController)
router.post('/reset-password', resetPasswordController)

router.get('/delete-account', authMiddlewares.checkToken, accountDeleteCheckCodeController)
router.post('/delete-account', authMiddlewares.checkToken, accountDeleteController)


module.exports = router