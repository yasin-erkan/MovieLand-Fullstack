const defaultRequest = (req, res) => {
  // Set the status code of the response
  res.statusCode = 404;

  // Add the content type of the response as a header
  // res.setHeader("Content-Type", "application/json");

  // Define the content of the response
  res.write(JSON.stringify({ message: "The requested address is undefined" }));

  // Send the response to the client
  res.end();
};

module.exports = defaultRequest;
