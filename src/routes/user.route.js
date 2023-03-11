const router = require('express').Router()
const userController = require('../controllers/user.controller')
const authenticate = require('../middleware/authenticate.middleware')

router.post('/',  userController.createUser)
router.get('/:id', userController.findUser)
router.patch('/:id', userController.updateUser)
router.get('/', authenticate, userController.findUsers)
router.delete('/:id', userController.deleteUser)

module.exports = router 

