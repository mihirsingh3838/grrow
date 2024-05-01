import { Router } from "express";
import { register, login, logout, getProfile, posts } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router= Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn ,getProfile);
router.get('/posts', isLoggedIn, posts)

export default router;