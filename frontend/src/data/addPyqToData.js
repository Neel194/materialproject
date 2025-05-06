// Usage: node addPyqToData.js path/to/newPyq.json
// newPyq.json should contain: { year, branch, subject, session, pyqYear, name, description, author, previewLink, downloadLink }

const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "pyqData.js");

function loadPyqData() {
  const raw = fs.readFileSync(dataFile, "utf-8");
  const jsonStr = raw
    .replace(/^export const pyqData = /, "")
    .replace(/;\s*$/, "");
  return eval("(" + jsonStr + ")");
}

function savePyqData(data) {
  const content =
    "export const pyqData = " + JSON.stringify(data, null, 2) + ";\n";
  fs.writeFileSync(dataFile, content, "utf-8");
}

function addPyq(newPyq) {
  const {
    year,
    branch,
    subject,
    session,
    pyqYear,
    name,
    description,
    author,
    previewLink,
    downloadLink,
  } = newPyq;
  const key = `${year.split(" ")[0]}_${branch}`;
  let data = loadPyqData();
  if (!data[key]) data[key] = [];
  let subj = data[key].find((s) => s.name === subject);
  if (!subj) {
    subj = { name: subject, pyqs: [] };
    data[key].push(subj);
  }
  const entry = {
    session,
    pyqYear,
    name,
    description,
    author,
    previewLink,
    downloadLink,
  };
  subj.pyqs.push(entry);
  savePyqData(data);
  console.log(
    `Added PYQ to ${year} ${branch} - ${subject} (${session} ${pyqYear})`
  );
}

// Main
const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node addPyqToData.js path/to/newPyq.json");
  process.exit(1);
}
const newPyq = JSON.parse(fs.readFileSync(inputFile, "utf-8"));
addPyq(newPyq);
