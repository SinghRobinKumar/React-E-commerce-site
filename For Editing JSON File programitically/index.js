const fs = require("fs");

// read JSON object from file
fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }

  // parse JSON object
  const user = JSON.parse(data);

  // print JSON object
  user.map((data, index) => {
    index++;
    data._id = index;
  });
  const d = JSON.stringify(user);

  fs.writeFile("product1.json", d, err => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });

  console.log(user);
});
