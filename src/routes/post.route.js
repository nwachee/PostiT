import { Router } from 'express';
import {
createPost,
getPost,
getAllpost,
updatePost,
deletePost } from '../controllers/post.controller.js';
import { createComment, getAllcomments, getComment, updateComment, deleteComment} from '../controllers/comment.controller.js';
import {isAuth} from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import { newPost, newComment, postUpdate, commentUpdate  } from '../schema/index.schema.js';
const router = Router();

router.post('/',  isAuth, validate(newPost), createPost)
router.get('/:id', getPost)
router.patch('/:id', isAuth, validate(postUpdate), updatePost)
router.get('/', getAllpost)
router.delete('/:id', isAuth, deletePost)
router.post('/:id/comments',  isAuth, validate(newComment), createComment)
router.get('/:id/comments/:id', getComment)
router.patch('/:postId/comments/:commentId', validate(commentUpdate), updateComment)
router.get('/:postId/comments', getAllcomments)
router.delete('/:postId/comments/:commentId', isAuth, deleteComment)

export default router;
