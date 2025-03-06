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
exports.addHolidaysToCalendar = void 0;
const db_ignit_1 = __importDefault(require("../db/db-ignit"));
const nagerUrl = process.env.NAGER_URL || "";
const addHolidaysToCalendar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { countryCode, year, holidays } = req.body;
    const holidaysResponse = yield getAllHolidays(year, countryCode, holidays);
    const sql = "INSERT INTO events (date, name, user_id) VALUES (?, ?, ?)";
    for (const holiday of holidaysResponse) {
        const [insResult] = yield db_ignit_1.default.query(sql, [
            holiday.date,
            holiday.name,
            userId,
        ]);
        if (!insResult.insertId) {
            res.status(500).json({ ok: false });
            return;
        }
    }
    res.json({ ok: true });
});
exports.addHolidaysToCalendar = addHolidaysToCalendar;
const getAllHolidays = (year, countryCode, holidays) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(nagerUrl + `/PublicHolidays/${year}/${countryCode}`);
    let holidaysResponse = yield response.json();
    if (holidays.length > 0) {
        holidaysResponse = holidaysResponse.filter((holiday) => holidays.includes(holiday.name));
    }
    return holidaysResponse;
});
