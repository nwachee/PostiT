import { Router } from 'express';
import commentController from '../controllers/comment.controller.js';
const router = Router();

router.post('/',  commentController.createcomment)
router.get('/:id', commentController.findcomment)
router.patch('/:id', commentController.updatecomment)
router.get('/', commentController.findcomments)
router.delete('/:id', commentController.deletecomment)

export default router;
