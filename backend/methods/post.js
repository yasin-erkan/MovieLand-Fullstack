const bodyParser = require("../utils/bodyParser");
const crypto = require("crypto");
const fs = require("fs");

const keys = ["title", "year", "rating", "description", "language", "director"];

const postRequest = async (req, res) => {
  if (req.url === "/api/movies") {
    // Access the body of the request
    const body = await bodyParser(req);

    // Check the incoming data
    if (
      keys.some((key) => !body[key]) ||
      !body.genre.length > 0 ||
      !body.cast.length > 0
    ) {
      res.writeHead(404);
      res.end("Please define all required fields");
      return;
    }

    // Add an id to the movie (universal unique identifier)
    body.id = crypto.randomUUID();

    // Retrieve data from the JSON file
    let data = fs.readFileSync("./data/movies.json", "utf-8");
    data = JSON.parse(data);

    // Add the new movie to the existing movies
    data.push(body);

    // Update the JSON file
    fs.writeFileSync("./data/movies.json", JSON.stringify(data));

    // Send a response to the client
    res.writeHead(201);
    res.end(JSON.stringify(body));
  } else {
    res.writeHead(404);
    res.end("Invalid path requested");
  }
};

module.exports = postRequest;
