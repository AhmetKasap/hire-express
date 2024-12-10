const express = require('express')
const router = express.Router()

const authMiddlewares = require('../middlewares/auth.middlewares')
 
const {
    uploadAvatar, 
    uploadImages,
    getProfile,
    editProfile,
    getAvatar,
    updateAvatar,
    addFavorites,
    deleteFavorites,
    getFavorites

} = require('../controllers/user.controller')


// USER PROFILE 
router.get('/:id', getProfile)
router.put('/', authMiddlewares.checkToken, editProfile)

router.get('/avatar/:id', getAvatar)
router.put('/avatar', authMiddlewares.checkToken, updateAvatar)

// USER FAVORITES
router.get('/favorites', authMiddlewares.checkToken, getFavorites)
router.post('/favorites/:id', authMiddlewares.checkToken, addFavorites)
router.delete('/favorites/:id', authMiddlewares.checkToken, deleteFavorites)






router.post('/avatar', uploadAvatar)
router.post('/images', uploadImages)




module.exports = router