# Country Codes Library

A utility library for working with country codes, phone codes, and currency symbols.

## Table of Contents

- [Installation](#installation)
- [Functions](#functions)
  - [getPhoneCode](#getphonecode)
  - [getPhoneCodeByCountryName](#getphonecodebycountryname)
  - [getCurrency](#getcurrency)
  - [getCountryISOCode](#getcountryisocode)
  - [getCountryDetails](#getcountrydetails)
- [Types](#types)
- [Examples](#examples)

## Installation

```bash
npm install country-codes-kit
```

## Functions

### getPhoneCode

Returns an array of phone codes associated with a given ISO2 country code.

#### Signature

```typescript
function getPhoneCode(country_code: ISO2_CODE): string[];
```

#### Parameters

- `country_code` (ISO2_CODE): The ISO2 country code (e.g., "US", "GB")

#### Returns

- `string[]`: Array of phone codes for the given country code

#### Example

```typescript
import { getPhoneCode } from "country-codes-kit";

// Get phone codes for the United States
const usCode = getPhoneCode("US");
console.log(usCodes); // Output: ["1"]

// Get phone codes for the United Kingdom
const ukCode = getPhoneCode("GB");
console.log(ukCodes); // Output: ["44"]

// Get phone codes for a non-existent country code
const nonExistent = getPhoneCode("XX");
console.log(nonExistent); // Output: []
```

### getPhoneCodeByCountryName

Returns an array of phone codes associated with a given country name.

#### Signature

```typescript
function getPhoneCodeByCountryName(country: string): string[];
```

#### Parameters

- `country` (string): The country name (e.g., "United States", "United Kingdom")

#### Returns

- `string[]`: Array of phone codes associated with the given country

#### Example

```typescript
import { getPhoneCodeByCountryName } from "country-codes-kit";

// Get phone codes for the United States
const usCodes = getPhoneCodeByCountryName("United States");
console.log(usCodes); // Output: ["1"]

// Get phone codes for Nigeria
const nigeriaCodes = getPhoneCodeByCountryName("Nigeria");
console.log(nigeriaCodes); // Output: ["234"]

// Get phone codes for a non-existent country
const nonExistent = getPhoneCodeByCountryName("Nonexistia");
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
import { getCurrency } from "country-codes-kit";

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

### getCountryISOCode

Returns the ISO2 or ISO3 code associated with a given country name.

#### Signature

```typescript
function getCountryISOCode(
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
import { getCountryISOCode } from "country-codes-kit";

// Get default ISO2 code for the United States
const usCode = getCountryISOCode("United States");
console.log(usCode); // Output: "US"

// Get ISO2 code explicitly
const usIso2 = getCountryISOCode("United States", { iso_2: true });
console.log(usIso2); // Output: "US"

// Get ISO3 code
const usIso3 = getCountryISOCode("United States", { iso_3: true });
console.log(usIso3); // Output: "USA"

// Get code for a country with mixed case
const mixedCase = getCountryISOCode("uniTed kiNGdom");
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
import { getCountryDetails } from "country-codes-kit";

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
  getPhoneCode,
  getPhoneCodeByCountryName,
  getCurrency,
  getCountryISOCode,
  getCountryDetails,
} from "country-codes-kit";

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
const phoneCodes = getPhoneCodeByCountryName("France");
console.log(`Phone codes for France: ${phoneCodes.join(", ")}`);
// Output: Phone codes for France: 33

// Get country codes
const franceIso3 = getCountryISOCode("France", { iso_3: true });
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
