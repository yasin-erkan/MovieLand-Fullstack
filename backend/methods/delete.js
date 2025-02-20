const fs = require("fs");

const deleteRequest = (req, res) => {
  // Store the base URL (excluding the last parameter)
  const path = req.url.substring(0, req.url.lastIndexOf("/"));

  // Store the id value from the URL
  const id = req.url.split("/")[3];

  if (path === "/api/movies" && id) {
    // Retrieve all movies
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    // Search for a movie with the given id
    const isFound = data.find((i) => i.id === id);

    // If the movie is not found, return an error
    if (!isFound) {
      res.writeHead(404);
      return res.end("The movie with the given id was not found");
    }

    // Remove the movie with the given id from the array
    const filtered = data.filter((i) => i.id !== id);

    // Save the updated movie list to the JSON file
    fs.writeFileSync("./data/movies.json", JSON.stringify(filtered));

    // Send a response to the client
    res.writeHead(204);
    return res.end();
  }
};

module.exports = deleteRequest;
