import { Router } from 'express';
import postController from '../controllers/post.controller.js';
const router = Router();

router.post('/',  postController.createpost)
router.get('/:id', postController.findpost)
router.patch('/:id', postController.updatepost)
router.get('/', postController.findposts)
router.delete('/:id', postController.deletepost)

export default router;
