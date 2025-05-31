"use strict";
// import express from 'express';
// import { authMiddleware } from '../middlewares/auth.middleware';
// import { createProperty, getAllProperties, updateProperty, deleteProperty } from '../controllers/property.controller';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.get('/', getAllProperties);
// router.post('/', authMiddleware, createProperty);
// router.put('/:id', authMiddleware, updateProperty);
// router.delete('/:id', authMiddleware, deleteProperty);
// export default router;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const property_controller_1 = require("../controllers/property.controller");
const router = express_1.default.Router();
router.get('/', property_controller_1.getAllProperties);
// New route to get property by ID
router.get('/:id', property_controller_1.getPropertyById);
router.post('/', auth_middleware_1.authMiddleware, property_controller_1.createProperty);
router.put('/:id', auth_middleware_1.authMiddleware, property_controller_1.updateProperty);
router.delete('/:id', auth_middleware_1.authMiddleware, property_controller_1.deleteProperty);
exports.default = router;
