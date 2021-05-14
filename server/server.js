const express = require('express');
var history = require('connect-history-api-fallback');
const path = require('path');
var cors = require('cors')
const serveStatic = require('serve-static');
var jsonServer = require('json-server');

let app = express();

app.use(cors())
app.use('/api', jsonServer.router('db.json'));
app.use(history());
app.use(serveStatic(__dirname + "/public/"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});