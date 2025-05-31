import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import propertyRoutes from './routes/property.routes';
import favoriteRoutes from './routes/favorite.routes';
import recommendRoutes from './routes/recommend.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/recommendations', recommendRoutes);

export default app;
