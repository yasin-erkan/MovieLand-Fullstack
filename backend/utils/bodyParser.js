// To access the data in the body of the request, combine all the incoming bytes piece by piece and return it to the function call

const bodyParser = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      // When each part of the body comes from the frontend, receive it and add it to the string above
      req.on("data", (chunk) => {
        body += chunk;
      });

      // When the upload is finished, convert the JSON data to JS data
      req.on("end", () => {
        // Return the body content to the function that called it
        resolve(JSON.parse(body));
      });
    } catch (err) {
      // If an error occurs, return the error
      reject(err);
    }
  });
};

module.exports = bodyParser;
