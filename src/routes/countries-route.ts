import express from "express";
import { getAvailableCountries, getCountryInfo } from "../controllers/countries-controller";

const router = express.Router();

router.get("/AvailableCountries", getAvailableCountries);

router.get("/CountryInfo/:code", getCountryInfo);

export default router;
