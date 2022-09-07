const fs = require("fs");
// const book = {
//   title: "The story of my life",
//   author: "Mahatma Gandhi",
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync("1-json.json", bookJSON);

const data = fs.readFileSync("1-json.json");
const dataStringify = data.toString();
const dataObject = JSON.parse(dataStringify);

dataObject.name = "chirag";
dataObject.age = 22;

updatedDataObject = JSON.stringify(dataObject);

fs.writeFileSync("1-json.json",updatedDataObject );

console.log(dataObject);