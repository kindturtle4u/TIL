const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "../.env");
const envContent = fs.readFileSync(envPath, "utf-8");

const envLines = envContent.split("\n").filter((line) => line.trim() !== "");

const schema = envLines
  .find((line) => line.startsWith("SCHEMA="))
  ?.split("=")[1]
  ?.replace(/"/g, "");
const dbUrl = envLines
  .find((line) => line.startsWith("DATABASE_URL="))
  ?.split("DATABASE_URL=")[1]
  ?.replace(/"/g, "");
const directUrl = envLines
  .find((line) => line.startsWith("DIRECT_URL="))
  ?.split("DIRECT_URL=")[1]
  ?.replace(/"/g, "");

let resultContent;
if (schema) {
  resultContent = [
    `DATABASE_URL="${dbUrl}&schema=${schema}"`,
    `DIRECT_URL="${directUrl}?schema=${schema}"`,
    `SCHEMA="${schema}"`,
  ].join("\n");
} else {
  resultContent = [
    `DATABASE_URL="${dbUrl.split("&schema=")[0]}"`,
    `DIRECT_URL="${directUrl.split("?schema=")[0]}"`,
  ].join("\n");
}
fs.writeFileSync(envPath, resultContent);

return;
