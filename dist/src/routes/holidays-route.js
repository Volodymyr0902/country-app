"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const holidays_controller_1 = require("../controllers/holidays-controller");
const router = express_1.default.Router();
router.post("/users/:userId/calendar/holidays", holidays_controller_1.addHolidaysToCalendar);
exports.default = router;
