import {
  COUNTRY_ISO_CODE_2,
  COUNTRY_ISO_CODE_3,
  CURRENCY_CODE,
  ISO2_PHONE_CODE,
  ISO2_CODE,
} from "../codes/index.js";

interface Options {
  iso_2?: boolean;
  iso_3?: boolean;
}

interface ICountryDetails {
  country: string;
  phone_codes: string[];
  isoCode2: string;
  isoCode3: string;
  currency: string;
}
/**
 * Given an ISO2 country code, returns an array of phone codes associated with
 * that country. If the country code does not exist in the mapping, returns an
 * empty array.
 *
 * @param {ISO2_CODE} country_code - The ISO2 country code
 * @returns {string[]} - Array of phone codes for the given country code
 * @example
 * getPhoneCodes("US") // ["1"]
 * getPhoneCodes("NG") // ["234"]
 */

export function getPhoneCodes(country_code: ISO2_CODE): string[] {
  if (ISO2_PHONE_CODE[country_code]) {
    return ISO2_PHONE_CODE[country_code];
  }
  return [];
}
/**
 * Given a country name, returns an array of phone codes associated with that
 * country. If the country code does not exist in the mapping, returns an empty
 * array.
 *
 * @param {string} country - The country name
 * @returns {string[]} - Array of phone codes associated with the given country
 * @example
 * getPhoneCodesByCountryName("United States") // ["1"]
 * getPhoneCodesByCountryName("Nigeria") // ["234"]
 */
export function getPhoneCodesByCountryName(country: string): string[] {
  if (COUNTRY_ISO_CODE_2[country]) {
    const countryCode = COUNTRY_ISO_CODE_2[country];
    return getPhoneCodes(countryCode as ISO2_CODE);
  }
  return [];
}

/**
 * Given an ISO2 code or a string representing a country code, returns the
 * currency symbol associated with that country. If the country code is not
 * found, it returns a default symbol "#".
 *
 * @param {ISO2_CODE | string} country_code - ISO2 code or a string representing
 * the country code
 * @returns {string} - The currency symbol or "#" if the country code is not found
 */

export function getCurrency(country_code: ISO2_CODE) {
  if (CURRENCY_CODE[country_code]) {
    return CURRENCY_CODE[country_code];
  }
  return "#";
}

/**
 * Given a country name, returns the ISO2 or ISO3 code associated with that
 * country. If given an Options object with an "iso_2" property set to true,
 * returns the ISO2 code. If given an Options object with an "iso_3" property
 * set to true, returns the ISO3 code. Otherwise, defaults to returning the ISO2
 * code.
 *
 * @param {string} country - The country name
 * @param {Options} [options] - Options object with properties "iso_2" and/or
 * "iso_3" set to true
 * @returns {string} - The ISO2 or ISO3 code associated with the given country
 */
export function getCountryCodes(
  country: string,
  options?: Options
): string | undefined {
  country = country.toUpperCase();
  if (options?.iso_2) {
    return COUNTRY_ISO_CODE_2[country];
  }
  if (options?.iso_3) {
    return COUNTRY_ISO_CODE_3[country];
  }
  return COUNTRY_ISO_CODE_2[country];
}

/**
 * Given a string representing a country name, returns an object containing the
 * country name, its ISO2 and ISO3 codes, and its associated phone codes and
 * currency symbol. If the country code does not exist in the mapping, returns
 * undefined.
 *
 * @param {string} country - The country name
 * @returns {ICountryDetails | undefined} - The country details object, or undefined
 * if the country code is not found
 * @example
 * getCountryDetails("United States")
 * // {
 * //   country: "United States",
 * //   phone_codes: ["1"],
 * //   isoCode2: "US",
 * //   isoCode3: "USA",
 * //   currency: "$"
 * // }
 */
export function getCountryDetails(
  country: string
): ICountryDetails | undefined {
  country = country.toUpperCase();
  if (COUNTRY_ISO_CODE_2[country]) {
    return {
      country,
      phone_codes: getPhoneCodesByCountryName(country),
      isoCode2: COUNTRY_ISO_CODE_2[country],
      isoCode3: COUNTRY_ISO_CODE_3[country],
      currency: getCurrency(COUNTRY_ISO_CODE_2[country] as ISO2_CODE),
    };
  }
}
