const fs = require("fs");
const path = require("path");

function renameESM(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      renameESM(fullPath);
    } else if (entry.name.endsWith(".js")) {
      fs.renameSync(fullPath, fullPath.replace(/\.js$/, ".mjs"));

      let content = fs.readFileSync(fullPath.replace(/\.js$/, ".mjs"), "utf8");
      content = content.replace(/from ['"](.+?)\.js['"]/g, 'from "$1.mjs"');
      content = content.replace(/import ['"](.+?)\.js['"]/g, 'import "$1.mjs"');
      fs.writeFileSync(fullPath.replace(/\.js$/, ".mjs"), content);
    }
  }
}

console.log("Renaming ESM files from .js to .mjs...");
renameESM("./build/esm");
console.log("Done!");
