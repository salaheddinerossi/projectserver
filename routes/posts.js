import express from 'express';
import { getPosts , createPosts } from '../controllers/posts.js';
import { updatePost , deletePost , likePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPosts);
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likepost', likePost)


export default router;