const http = require("http");
const getRequest = require("./methods/get");
const postRequest = require("./methods/post");
const deleteRequest = require("./methods/delete");
const defaultRequest = require("./methods/default");
const optionsRequest = require("./methods/options");

// 1) Create the server
const server = http.createServer((req, res) => {
  // Add a common data type header to all responses
  res.setHeader("Content-Type", "application/json");
  // To avoid issues with resource sharing (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log("🎾🎾 REQUEST RECEIVED!!", req.method);

  // Based on the method of the incoming request, send different responses to the client.
  // To avoid code clutter, we defined functions that respond to requests in separate files.
  switch (req.method) {
    case "GET":
      return getRequest(req, res);

    case "POST":
      return postRequest(req, res);

    case "DELETE":
      return deleteRequest(req, res);

    case "OPTIONS":
      return optionsRequest(req, res);

    default:
      return defaultRequest(req, res);
  }
});

// 2) Listen for requests on a specific port
const port = 4090;

server.listen(port, () => {
  console.log(`🎾 Server started listening for requests on port ${port}`);
});
