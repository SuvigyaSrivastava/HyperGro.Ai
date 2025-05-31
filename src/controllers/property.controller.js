"use strict";
// import Property from '../models/property.model';
// import { redis } from '../config/redis';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = exports.updateProperty = exports.getPropertyById = exports.getAllProperties = exports.createProperty = void 0;
// export const createProperty = async (req: any, res: any) => {
//   const property = await Property.create({ ...req.body, createdBy: req.userId });
//   await redis.del('properties');
//   res.json(property);
// };
// export const getAllProperties = async (req: any, res: any) => {
//   const cached = await redis.get('properties');
//   if (cached) return res.json(JSON.parse(cached));
//   const properties = await Property.find();
//   await redis.set('properties', JSON.stringify(properties));
//   res.json(properties);
// };
// export const updateProperty = async (req: any, res: any) => {
//   const prop = await Property.findById(req.params.id);
//   if (!prop || !prop.createdBy || prop.createdBy.toString() !== req.userId)
//     return res.status(403).json({ error: 'Not allowed' });
//   const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   await redis.del('properties');
//   res.json(updated);
// };
// export const deleteProperty = async (req: any, res: any) => {
//   const prop = await Property.findById(req.params.id);
//   if (!prop || !prop.createdBy || prop.createdBy.toString() !== req.userId)
//     return res.status(403).json({ error: 'Not allowed' });
//   await Property.findByIdAndDelete(req.params.id);
//   await redis.del('properties');
//   res.json({ success: true });
// };
const property_model_1 = __importDefault(require("../models/property.model"));
const redis_1 = require("../config/redis");
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield property_model_1.default.create(Object.assign(Object.assign({}, req.body), { createdBy: req.userId }));
        yield redis_1.redis.del('properties');
        res.json(property);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create property' });
    }
});
exports.createProperty = createProperty;
const getAllProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cached = yield redis_1.redis.get('properties');
        if (cached)
            return res.json(JSON.parse(cached));
        const properties = yield property_model_1.default.find();
        yield redis_1.redis.set('properties', JSON.stringify(properties));
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});
exports.getAllProperties = getAllProperties;
// New function to get a single property by ID with Redis caching
const getPropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyId = req.params.id;
    try {
        const cached = yield redis_1.redis.get(`property:${propertyId}`);
        if (cached) {
            return res.json(JSON.parse(cached));
        }
        const property = yield property_model_1.default.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        // Cache the property data for 1 hour (3600 seconds)
        yield redis_1.redis.setex(`property:${propertyId}`, 3600, JSON.stringify(property));
        res.json(property);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getPropertyById = getPropertyById;
const updateProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prop = yield property_model_1.default.findById(req.params.id);
        if (!prop || !prop.createdBy || prop.createdBy.toString() !== req.userId) {
            return res.status(403).json({ error: 'Not allowed' });
        }
        const updated = yield property_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        yield redis_1.redis.del('properties');
        yield redis_1.redis.del(`property:${req.params.id}`);
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update property' });
    }
});
exports.updateProperty = updateProperty;
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prop = yield property_model_1.default.findById(req.params.id);
        if (!prop || !prop.createdBy || prop.createdBy.toString() !== req.userId) {
            return res.status(403).json({ error: 'Not allowed' });
        }
        yield property_model_1.default.findByIdAndDelete(req.params.id);
        yield redis_1.redis.del('properties');
        yield redis_1.redis.del(`property:${req.params.id}`);
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete property' });
    }
});
exports.deleteProperty = deleteProperty;
