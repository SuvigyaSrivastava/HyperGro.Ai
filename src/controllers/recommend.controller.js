"use strict";
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
exports.getRecommendations = exports.recommendProperty = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const recommendProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipientEmail, propertyId } = req.body;
    const recipient = yield user_model_1.default.findOne({ email: recipientEmail });
    if (!recipient)
        return res.status(404).json({ error: 'Recipient not found' });
    recipient.recommendations.push(propertyId);
    yield recipient.save();
    res.json({ success: true });
});
exports.recommendProperty = recommendProperty;
const getRecommendations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.userId).populate('recommendations');
    res.json(user === null || user === void 0 ? void 0 : user.recommendations);
});
exports.getRecommendations = getRecommendations;
