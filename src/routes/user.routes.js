const express = require('express')
const router = express.Router()

const authMiddlewares = require('../middlewares/auth.middlewares')
 
const {
    uploadAvatar, 
    uploadImages,
    getProfile,
    editProfile,
    getAvatar,
    updateAvatar

} = require('../controllers/user.controller')


// USER PROFILE 
router.get('/:id', getProfile)
router.put('/', authMiddlewares.checkToken, editProfile)

router.get('/avatar/:id', getAvatar)
router.put('/avatar', authMiddlewares.checkToken, updateAvatar)

// USER FAVORITES






router.post('/avatar', uploadAvatar)
router.post('/images', uploadImages)




module.exports = router