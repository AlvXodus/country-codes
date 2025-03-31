# Country Codes Library

A utility library for working with country codes, phone codes, and currency symbols.

## Table of Contents

- [Installation](#installation)
- [Functions](#functions)
  - [getPhoneCodes](#getphonecodes)
  - [getPhoneCodesByCountryName](#getphonecodessbycountryname)
  - [getCurrency](#getcurrency)
  - [getCountryCodes](#getcountrycodes)
  - [getCountryDetails](#getcountrydetails)
- [Types](#types)
- [Examples](#examples)

## Installation

```bash
npm install country-codes-library
```

## Functions

### getPhoneCodes

Returns an array of phone codes associated with a given ISO2 country code.

#### Signature

```typescript
function getPhoneCodes(country_code: ISO2_CODE): string[];
```

#### Parameters

- `country_code` (ISO2_CODE): The ISO2 country code (e.g., "US", "GB")

#### Returns

- `string[]`: Array of phone codes for the given country code

#### Example

```typescript
import { getPhoneCodes } from "country-codes-library";

// Get phone codes for the United States
const usCodes = getPhoneCodes("US");
console.log(usCodes); // Output: ["1"]

// Get phone codes for the United Kingdom
const ukCodes = getPhoneCodes("GB");
console.log(ukCodes); // Output: ["44"]

// Get phone codes for a non-existent country code
const nonExistent = getPhoneCodes("XX");
console.log(nonExistent); // Output: []
```

### getPhoneCodesByCountryName

Returns an array of phone codes associated with a given country name.

#### Signature

```typescript
function getPhoneCodesByCountryName(country: string): string[];
```

#### Parameters

- `country` (string): The country name (e.g., "United States", "United Kingdom")

#### Returns

- `string[]`: Array of phone codes associated with the given country

#### Example

```typescript
import { getPhoneCodesByCountryName } from "country-codes-library";

// Get phone codes for the United States
const usCodes = getPhoneCodesByCountryName("United States");
console.log(usCodes); // Output: ["1"]

// Get phone codes for Nigeria
const nigeriaCodes = getPhoneCodesByCountryName("Nigeria");
console.log(nigeriaCodes); // Output: ["234"]

// Get phone codes for a non-existent country
const nonExistent = getPhoneCodesByCountryName("Nonexistia");
console.log(nonExistent); // Output: []
```

### getCurrency

Returns the currency symbol associated with a given ISO2 country code.

#### Signature

```typescript
function getCurrency(country_code: ISO2_CODE): string;
```

#### Parameters

- `country_code` (ISO2_CODE): ISO2 code representing the country code

#### Returns

- `string`: The currency symbol or "#" if the country code is not found

#### Example

```typescript
import { getCurrency } from "country-codes-library";

// Get currency for the United States
const usCurrency = getCurrency("US");
console.log(usCurrency); // Output: "$"

// Get currency for the United Kingdom
const gbCurrency = getCurrency("GB");
console.log(gbCurrency); // Output: "£"

// Get currency for a non-existent country code
const nonExistent = getCurrency("XX");
console.log(nonExistent); // Output: "#"
```

### getCountryCodes

Returns the ISO2 or ISO3 code associated with a given country name.

#### Signature

```typescript
function getCountryCodes(
  country: string,
  options?: Options
): string | undefined;
```

#### Parameters

- `country` (string): The country name
- `options` (Options, optional): Options object with properties:
  - `iso_2` (boolean): If true, returns the ISO2 code
  - `iso_3` (boolean): If true, returns the ISO3 code

#### Returns

- `string | undefined`: The ISO2 or ISO3 code associated with the given country or undefined if not found

#### Example

```typescript
import { getCountryCodes } from "country-codes-library";

// Get default ISO2 code for the United States
const usCode = getCountryCodes("United States");
console.log(usCode); // Output: "US"

// Get ISO2 code explicitly
const usIso2 = getCountryCodes("United States", { iso_2: true });
console.log(usIso2); // Output: "US"

// Get ISO3 code
const usIso3 = getCountryCodes("United States", { iso_3: true });
console.log(usIso3); // Output: "USA"

// Get code for a country with mixed case
const mixedCase = getCountryCodes("uniTed kiNGdom");
console.log(mixedCase); // Output: "GB"
```

### getCountryDetails

Returns a comprehensive object with details about a given country.

#### Signature

```typescript
function getCountryDetails(country: string): ICountryDetails | undefined;
```

#### Parameters

- `country` (string): The country name

#### Returns

- `ICountryDetails | undefined`: An object containing the country details or undefined if not found:
  - `country` (string): The country name (uppercase)
  - `phone_codes` (string[]): Array of phone codes
  - `isoCode2` (string): ISO2 country code
  - `isoCode3` (string): ISO3 country code
  - `currency` (string): Currency symbol

#### Example

```typescript
import { getCountryDetails } from "country-codes-library";

// Get details for the United States
const usDetails = getCountryDetails("United States");
console.log(usDetails);
/* Output:
{
  country: "UNITED STATES",
  phone_codes: ["1"],
  isoCode2: "US",
  isoCode3: "USA",
  currency: "$"
}
*/

// Get details for a non-existent country
const nonExistent = getCountryDetails("Nonexistia");
console.log(nonExistent); // Output: undefined
```

## Types

### ICountryDetails

```typescript
interface ICountryDetails {
  country: string; // Country name
  phone_codes: string[]; // Array of phone codes
  isoCode2: string; // ISO2 country code
  isoCode3: string; // ISO3 country code
  currency: string; // Currency symbol
}
```

### Options

```typescript
interface Options {
  iso_2?: boolean; // Flag to return ISO2 code
  iso_3?: boolean; // Flag to return ISO3 code
}
```

## Examples

### Complete Usage Example

```typescript
import {
  getPhoneCodes,
  getPhoneCodesByCountryName,
  getCurrency,
  getCountryCodes,
  getCountryDetails,
} from "country-codes-library";

// Find details for a country
const canadaDetails = getCountryDetails("Canada");
console.log(canadaDetails);
/* Output:
{
  country: "CANADA",
  phone_codes: ["1"],
  isoCode2: "CA",
  isoCode3: "CAN",
  currency: "$"
}
*/

// Get currency symbol using ISO2 code
const currencySymbol = getCurrency(canadaDetails.isoCode2);
console.log(`Currency symbol for Canada: ${currencySymbol}`);
// Output: Currency symbol for Canada: $

// Get phone codes for a country name
const phoneCodes = getPhoneCodesByCountryName("France");
console.log(`Phone codes for France: ${phoneCodes.join(", ")}`);
// Output: Phone codes for France: 33

// Get country codes
const franceIso3 = getCountryCodes("France", { iso_3: true });
console.log(`ISO3 code for France: ${franceIso3}`);
// Output: ISO3 code for France: FRA
```

### Handling Case Sensitivity

All functions that accept a country name parameter will convert the input to uppercase before processing:

```typescript
const lowercase = getCountryDetails("japan");
const mixedCase = getCountryDetails("JaPaN");
const uppercase = getCountryDetails("JAPAN");

console.log(lowercase.isoCode2 === mixedCase.isoCode2); // Output: true
console.log(mixedCase.isoCode2 === uppercase.isoCode2); // Output: true
```
