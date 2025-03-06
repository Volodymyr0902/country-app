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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryInfo = exports.getAvailableCountries = void 0;
const nagerUrl = process.env.NAGER_URL || "";
const countriesNowUrl = process.env.COUNTRIES_NOW_URL || "";
const getAvailableCountries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(nagerUrl + "/AvailableCountries");
    const countries = yield response.json();
    res.json(countries);
});
exports.getAvailableCountries = getAvailableCountries;
const getCountryInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const borders = yield getBorders(code);
    const population = yield getPopulation(code);
    const flag = yield getFlag(code);
    res.json({ borders, population, flag });
});
exports.getCountryInfo = getCountryInfo;
const getBorders = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const response1 = yield fetch(nagerUrl + `/CountryInfo/${code}`);
    const countryResponse = yield response1.json();
    if (countryResponse && countryResponse.borders) {
        return countryResponse.borders;
    }
});
const getPopulation = (code) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response2 = yield fetch(countriesNowUrl + "/population");
    const populationResponse = yield response2.json();
    if (populationResponse && populationResponse.data) {
        return (_a = populationResponse.data.find((country) => country.code === code)) === null || _a === void 0 ? void 0 : _a.populationCounts;
    }
});
const getFlag = (code) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const flagRes = yield fetch(countriesNowUrl + "/flag/images");
    const flagResponse = yield flagRes.json();
    if (flagResponse && flagResponse.data) {
        return (_a = flagResponse.data.find((country) => {
            return country.iso3 === code;
        })) === null || _a === void 0 ? void 0 : _a.flag;
    }
});
