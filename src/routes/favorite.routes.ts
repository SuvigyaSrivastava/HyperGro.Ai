import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favorite.controller';

const router = express.Router();
router.get('/', authMiddleware, getFavorites);
router.post('/add', authMiddleware, addFavorite);
router.post('/remove', authMiddleware, removeFavorite);
export default router;
