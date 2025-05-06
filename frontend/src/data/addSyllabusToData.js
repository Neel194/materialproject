// Usage: node addSyllabusToData.js path/to/newSyllabus.json
// newSyllabus.json should contain: { year, branch, subject, description, units, previewLink, downloadLink }

import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the existing syllabus data
const rawData = fs.readFileSync(`${__dirname}/syllabusData.js`, "utf8");
const jsonStr = rawData
  .replace(/^export const syllabusData = /, "")
  .replace(/;\s*$/, "");
const syllabusData = eval("(" + jsonStr + ")");

// Read the new syllabus data from the JSON file
const newSyllabusData = JSON.parse(
  fs.readFileSync(`${__dirname}/newSyllabusData.json`, "utf8")
);

// Process each new syllabus entry
newSyllabusData.forEach((newSyll) => {
  const {
    year,
    branch,
    subject,
    description,
    units,
    previewLink,
    downloadLink,
  } = newSyll;
  const key = `${year.split(" ")[0]}_${branch}`;

  if (!syllabusData[key]) {
    syllabusData[key] = [];
  }

  let subj = syllabusData[key].find((s) => s.name === subject);
  if (!subj) {
    subj = { name: subject, description, units, previewLink, downloadLink };
    syllabusData[key].push(subj);
  } else {
    // Update existing subject
    subj.description = description;
    subj.units = units;
    subj.previewLink = previewLink;
    subj.downloadLink = downloadLink;
  }
});

// Write the updated data back to the file
const content =
  "export const syllabusData = " +
  JSON.stringify(syllabusData, null, 2) +
  ";\n";
fs.writeFileSync(`${__dirname}/syllabusData.js`, content, "utf8");

console.log("Syllabus data updated successfully!");
