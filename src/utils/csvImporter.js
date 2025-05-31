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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const property_model_1 = __importDefault(require("../models/property.model"));
const db_1 = require("../config/db");
const filePath = path_1.default.join(__dirname, '../../assets/properties.csv');
const importProperties = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    const results = [];
    fs_1.default.createReadStream(filePath)
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => {
        var _a, _b;
        results.push({
            id: data.id,
            title: data.title,
            type: data.type,
            price: parseFloat(data.price),
            state: data.state,
            city: data.city,
            areaSqFt: parseInt(data.areaSqFt),
            bedrooms: parseInt(data.bedrooms),
            bathrooms: parseInt(data.bathrooms),
            amenities: ((_a = data.amenities) === null || _a === void 0 ? void 0 : _a.split(',').map((a) => a.trim())) || [],
            furnished: data.furnished,
            availableFrom: data.availableFrom,
            listedBy: data.listedBy,
            tags: ((_b = data.tags) === null || _b === void 0 ? void 0 : _b.split(',').map((t) => t.trim())) || [],
            colorTheme: data.colorTheme,
            rating: parseFloat(data.rating),
            isVerified: data.isVerified.toLowerCase() === 'true',
            listingType: data.listingType
        });
    })
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield property_model_1.default.insertMany(results);
            console.log(`✅ Imported ${results.length} properties`);
            process.exit();
        }
        catch (err) {
            console.error('❌ Failed to import:', err);
            process.exit(1);
        }
    }));
});
importProperties();
