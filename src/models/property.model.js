"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const propertySchema = new mongoose_1.default.Schema({
    id: String,
    title: String,
    type: String,
    price: Number,
    state: String,
    city: String,
    areaSqFt: Number,
    bedrooms: Number,
    bathrooms: Number,
    amenities: [String],
    furnished: String,
    availableFrom: String,
    listedBy: String,
    tags: [String],
    colorTheme: String,
    rating: Number,
    isVerified: Boolean,
    listingType: String,
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }
});
exports.default = mongoose_1.default.model('Property', propertySchema);
