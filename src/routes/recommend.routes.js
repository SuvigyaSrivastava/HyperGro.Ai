"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recommend_controller_1 = require("../controllers/recommend.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post('/', auth_middleware_1.authMiddleware, recommend_controller_1.recommendProperty);
router.get('/', auth_middleware_1.authMiddleware, recommend_controller_1.getRecommendations);
exports.default = router;
