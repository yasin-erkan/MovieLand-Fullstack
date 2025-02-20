const optionsRequest = (req, res) => {
  /*
   * When a POST/PUT/PATCH/DELETE request is made from the frontend, the browser first checks if the server accepts these request types by sending an OPTIONS HTTP method request.

   * If we do not respond to the OPTIONS request, the browser assumes that the API does not accept the above request types, and the actual request is never sent.

   * When an OPTIONS request is received, if we respond with the correct headers, the browser will send the actual request after the OPTIONS request.
    */

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  res.end();
};

module.exports = optionsRequest;
