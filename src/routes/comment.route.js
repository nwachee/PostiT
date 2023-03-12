const router = require('express').Router()
const commentController = require('../controllers/comment.controller')

router.post('/',  commentController.createcomment)
router.get('/:id', commentController.findcomment)
router.patch('/:id', commentController.updatecomment)
router.get('/', commentController.findcomments)
router.delete('/:id', commentController.deletecomment)

module.exports = router
