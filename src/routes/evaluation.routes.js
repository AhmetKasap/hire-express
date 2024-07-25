const express = require('express')
const router = express.Router()

const authMiddlewares = require('../middlewares/auth.middlewares')
const {
    getEvaluationController,
    createEvaluationController,
    deleteEvaluationController,
    editEvaluationController

} = require('../controllers/evaluation.controller')


router.get('/:id', getEvaluationController)
router.post('/',  authMiddlewares.checkToken, createEvaluationController)
router.delete('/:id', authMiddlewares.checkToken, deleteEvaluationController)



module.exports = router