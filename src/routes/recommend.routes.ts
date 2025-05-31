import express from 'express';
import { recommendProperty, getRecommendations } from '../controllers/recommend.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
router.post('/', authMiddleware, recommendProperty);
router.get('/', authMiddleware, getRecommendations);
export default router;
