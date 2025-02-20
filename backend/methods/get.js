const fs = require("fs");

const getRequest = (req, res) => {
  // Store the base URL (excluding the last parameter)
  const path = req.url.slice(0, 11);

  // Store the id value from the URL
  const id = req.url.split("/")[3];

  // Get the value of the parameter from the URL
  const param = req.url.split("=").pop().toLowerCase().trim();

  // If an id is added to the URL, send a specific movie
  if (path === "/api/movies" && id) {
    // 1) Retrieve the movies from the JSON file
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    // 2) Search for the movie with the corresponding id in the array
    const movie = data.find((i) => i.id === id);

    // 3) If the movie is found, send it to the client
    if (movie) {
      return res.end(JSON.stringify(movie));
    }

    // 4) If the movie is not found, send an error
    res.writeHead(404);
    return res.end(
      JSON.stringify({ message: "The requested movie was not found" })
    );
  }

  // If the base URL is requested, send all movies
  if (path === "/api/movies") {
    // 1) Retrieve the movies from the JSON file
    const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    // If a parameter is provided, send the filtered movies
    if (param && param !== "/api/movies") {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(param)
      );

      return res.end(JSON.stringify(filtered));
    }

    // If no parameter is provided, send all movies
    return res.end(JSON.stringify(movies));
  }

  // If the path is incorrect, send an error
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Path not found" }));
};

module.exports = getRequest;
