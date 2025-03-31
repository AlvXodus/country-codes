import {
  getCountryCodes,
  getCountryDetails,
  getCurrency,
  getPhoneCodes,
  getPhoneCodesByCountryName,
} from "./generators/index.js";

import {
  COUNTRY_ISO_CODE_2,
  COUNTRY_ISO_CODE_3,
  CURRENCY_CODE,
  ISO2_PHONE_CODE,
  ISO2_CODE,
} from "./codes/index.js";
import { get } from "http";

export {
  getCountryCodes,
  getCountryDetails,
  getCurrency,
  getPhoneCodes,
  getPhoneCodesByCountryName,
};

export {
  COUNTRY_ISO_CODE_2,
  COUNTRY_ISO_CODE_3,
  CURRENCY_CODE,
  ISO2_PHONE_CODE,
  ISO2_CODE,
};

console.log(getCountryCodes("United States"));
