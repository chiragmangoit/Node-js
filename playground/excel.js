const xlsx = require("xlsx");

const filePath =
  "/home/chirag/Node-js/diar backend/resources/1663231681598.xlsx";
const workbook = xlsx.readFile(filePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
// console.log(worksheet);
let posts = [];
let post = {};

workbook.SheetNames.forEach((element) => {
  console.log(workbook.Sheets[element]);
});

for (let cell in worksheet) {
  const cellAsString = cell.toString();

  if (
    cellAsString[1] !== "r" &&
    cellAsString[1] !== "m" &&
    cellAsString[1] > 1
  ) {
    if (cellAsString[0] === "A") {
      post.title = worksheet[cell].v;
    }
    if (cellAsString[0] === "B") {
      post.author = worksheet[cell].v;
    }
    if (cellAsString[0] === "C") {
      post.released = worksheet[cell].v;
      posts.push(post);
      post = {};
    }
  }
}

// console.log(posts);
