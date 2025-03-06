export type CountryResponse = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryResponse[] | null;
};

type PopulationYearItem = {
  year: number;
  value: number;
};

type DataWithPopulation = {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationYearItem[];
};

export type PopulationResponse = {
  error: boolean;
  msg: string;
  data: DataWithPopulation[];
};

type DataWithFlag = {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
};

export type FlagResponse = {
  error: boolean;
  msg: string;
  data: DataWithFlag[];
};

export type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
};
