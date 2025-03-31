import codes, { ICountryCodeItem } from "./codes";
import fs from "fs";

function ExtractIso2Code(codes: ICountryCodeItem[]) {
  const mappedCodes: { [key: string]: string } = {};

  codes.forEach((code: ICountryCodeItem) => {
    mappedCodes[code.country.toUpperCase()] = code.isoCode3;
  });

  const json = JSON.stringify(mappedCodes, null, 2);
  fs.writeFileSync("phone_codes_2.json", json);

  //   console.log(mappedCodes);
}

function extractTypes(codes: ICountryCodeItem[]): void {
  const mappedCodes = codes
    .map((code) => `"${code.isoCode3.toLowerCase()}"`)
    .join(" | ");
  const output = `export type types = ${mappedCodes};\n`;

  fs.writeFileSync("types_2.ts", output);
}
ExtractIso2Code(codes);
