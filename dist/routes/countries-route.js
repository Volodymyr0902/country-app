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
const express_1 = __importDefault(require("express"));
const nagerUrl = process.env.NAGER_URL || "";
const countriesNowUrl = process.env.COUNTRIES_NOW_URL || "";
const router = express_1.default.Router();
router.get("/AvailableCountries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(nagerUrl + "/AvailableCountries");
    const countries = yield response.json();
    res.json(countries);
}));
router.get("/CountryInfo/:code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let borders = [], population, flag;
    const { code } = req.params;
    const response1 = yield fetch(nagerUrl + `/CountryInfo/${code}`);
    const countryResponse = yield response1.json();
    if (countryResponse && countryResponse.borders) {
        borders = countryResponse.borders;
    }
    const response2 = yield fetch(countriesNowUrl + "/population");
    const populationResponse = yield response2.json();
    if (populationResponse && populationResponse.data) {
        population = (_a = populationResponse.data.find((country) => country.code === code)) === null || _a === void 0 ? void 0 : _a.populationCounts;
    }
    const flagRes = yield fetch(countriesNowUrl + "/flag/images");
    const flagResponse = yield flagRes.json();
    if (flagResponse && flagResponse.data) {
        flag = (_b = flagResponse.data.find((country) => {
            return country.iso3 === code;
        })) === null || _b === void 0 ? void 0 : _b.flag;
    }
    res.json({ borders, population, flag });
}));
exports.default = router;
