// import express from 'express';
// import { authMiddleware } from '../middlewares/auth.middleware';
// import { createProperty, getAllProperties, updateProperty, deleteProperty } from '../controllers/property.controller';

// const router = express.Router();
// router.get('/', getAllProperties);
// router.post('/', authMiddleware, createProperty);
// router.put('/:id', authMiddleware, updateProperty);
// router.delete('/:id', authMiddleware, deleteProperty);
// export default router;


import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { 
  createProperty, 
  getAllProperties, 
  getPropertyById,    // new import
  updateProperty, 
  deleteProperty 
} from '../controllers/property.controller';

const router = express.Router();

router.get('/', getAllProperties);

// New route to get property by ID
router.get('/:id', getPropertyById);

router.post('/', authMiddleware, createProperty);
router.put('/:id', authMiddleware, updateProperty);
router.delete('/:id', authMiddleware, deleteProperty);

export default router;
