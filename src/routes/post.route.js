const router = require('express').Router()
const postController = require('../controllers/post.controller')


router.post('/',  postController.createpost)
router.get('/:id', postController.findpost)
router.patch('/:id', postController.updatepost)
router.get('/', postController.findposts)
router.delete('/:id', postController.deletepost)

module.exports = router
