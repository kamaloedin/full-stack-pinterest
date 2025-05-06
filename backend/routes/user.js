import express from 'express';
import { getUser, loginUser, logoutUser, registerUser, followUser } from '../controllers/user.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/:username', getUser);
router.post('/auth/login', loginUser);
router.post('/auth/logout', logoutUser);
router.post('/auth/register', registerUser);
router.post('/follow/:username', verifyToken, followUser);

export default router;
