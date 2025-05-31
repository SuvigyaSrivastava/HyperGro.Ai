"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const favorite_controller_1 = require("../controllers/favorite.controller");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authMiddleware, favorite_controller_1.getFavorites);
router.post('/add', auth_middleware_1.authMiddleware, favorite_controller_1.addFavorite);
router.post('/remove', auth_middleware_1.authMiddleware, favorite_controller_1.removeFavorite);
exports.default = router;
