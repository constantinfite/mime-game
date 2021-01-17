const express = require('express');
var history = require('connect-history-api-fallback');
const path = require('path');
const serveStatic = require('serve-static');

let app = express();
app.use(history());
app.use(serveStatic(__dirname + "/public/"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});