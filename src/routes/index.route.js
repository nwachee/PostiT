import { Router } from 'express';
import userRoute from './auth.route.js';
import postRoute from './post.route.js';
import commentRoute from './comment.route.js';
import docRoute from './doc.route.js';

const router = Router();

router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server ok' });
 });

router.use('/auth', userRoute)
router.use('/posts', postRoute)
router.use('/comments', commentRoute)
router.use('/docs', docRoute)

export default router;