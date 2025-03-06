import { Request, Response } from "express";
import connection from "../db/db-ignit";
import { ResultSetHeader } from "mysql2";
import { Holiday } from "../../types/common";

const nagerUrl = process.env.NAGER_URL || "";

export const addHolidaysToCalendar = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { countryCode, year, holidays } = req.body;

  const holidaysResponse = await getAllHolidays(year, countryCode, holidays);
  const sql = "INSERT INTO events (date, name, user_id) VALUES (?, ?, ?)";

  for (const holiday of holidaysResponse) {
    const [insResult] = await connection.query<ResultSetHeader>(sql, [
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
};

const getAllHolidays = async (
  year: number,
  countryCode: string,
  holidays: string[]
) => {
  const response = await fetch(
    nagerUrl + `/PublicHolidays/${year}/${countryCode}`
  );

  let holidaysResponse: Holiday[] = await response.json();

  if (holidays.length > 0) {
    holidaysResponse = holidaysResponse.filter((holiday) =>
      holidays.includes(holiday.name)
    );
  }

  return holidaysResponse;
};
