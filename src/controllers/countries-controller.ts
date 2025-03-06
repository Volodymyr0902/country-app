import { Request, Response } from "express";
import {
  CountryResponse,
  PopulationResponse,
  FlagResponse,
} from "../../types/common";

const nagerUrl = process.env.NAGER_URL || "";
const countriesNowUrl = process.env.COUNTRIES_NOW_URL || "";

export const getAvailableCountries = async (req: Request, res: Response) => {
  const response = await fetch(nagerUrl + "/AvailableCountries");
  const countries = await response.json();

  res.json(countries);
};

export const getCountryInfo = async (req: Request, res: Response) => {
  const { code } = req.params;

  const borders = await getBorders(code);
  const population = await getPopulation(code);
  const flag = await getFlag(code);

  res.json({ borders, population, flag });
};

const getBorders = async (code: string) => {
  const response1 = await fetch(nagerUrl + `/CountryInfo/${code}`);
  const countryResponse: CountryResponse = await response1.json();

  if (countryResponse && countryResponse.borders) {
    return countryResponse.borders;
  }
};

const getPopulation = async (code: string) => {
  const response2 = await fetch(countriesNowUrl + "/population");
  const populationResponse: PopulationResponse = await response2.json();

  if (populationResponse && populationResponse.data) {
    return populationResponse.data.find((country) => country.code === code)
      ?.populationCounts;
  }
};

const getFlag = async (code: string) => {
  const flagRes = await fetch(countriesNowUrl + "/flag/images");
  const flagResponse: FlagResponse = await flagRes.json();

  if (flagResponse && flagResponse.data) {
    return flagResponse.data.find((country) => {
      return country.iso3 === code;
    })?.flag;
  }
};
