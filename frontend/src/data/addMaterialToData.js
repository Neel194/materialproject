// Usage: node addMaterialToData.js path/to/newMaterial.json
// newMaterial.json should contain: { year, branch, subject, materialType, name, description, author, previewLink, downloadLink }

const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "materialData.js");

function loadMaterialData() {
  const raw = fs.readFileSync(dataFile, "utf-8");
  // Remove 'export const materialData = ' and trailing semicolon
  const jsonStr = raw
    .replace(/^export const materialData = /, "")
    .replace(/;\s*$/, "");
  return eval("(" + jsonStr + ")");
}

function saveMaterialData(data) {
  const content =
    "export const materialData = " + JSON.stringify(data, null, 2) + ";\n";
  fs.writeFileSync(dataFile, content, "utf-8");
}

function addMaterial(newMat) {
  const {
    year,
    branch,
    subject,
    materialType,
    name,
    description,
    author,
    previewLink,
    downloadLink,
  } = newMat;
  const key = `${year.split(" ")[0]}_${branch}`;
  let data = loadMaterialData();
  if (!data[key]) data[key] = [];
  let subj = data[key].find((s) => s.name === subject);
  if (!subj) {
    subj = { name: subject, materials: [], books: [] };
    data[key].push(subj);
  }
  const entry = { name, description, author, previewLink, downloadLink };
  if (materialType === "Book") {
    subj.books.push(entry);
  } else {
    subj.materials.push(entry);
  }
  saveMaterialData(data);
  console.log(`Added ${materialType} to ${year} ${branch} - ${subject}`);
}

// Main
const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node addMaterialToData.js path/to/newMaterial.json");
  process.exit(1);
}
const newMat = JSON.parse(fs.readFileSync(inputFile, "utf-8"));
addMaterial(newMat);
