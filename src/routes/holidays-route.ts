import express from "express";
import { addHolidaysToCalendar } from "../controllers/holidays-controller";

const router = express.Router();

router.post("/users/:userId/calendar/holidays", addHolidaysToCalendar);

export default router;
