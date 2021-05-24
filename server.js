const express = require('express');
var history = require('connect-history-api-fallback');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose")
const { mongoUri } = require('./config')
const WordDataRoutes = require('./routes/api/WordListItem')
const path = require("path")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());


mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log("MongoDB database connected"))
  .catch((err) => console.log(err))

//app.use(serveStatic(__dirname + "/public/"));
//app.use('/api', jsonServer.router('server/db.json'));

app.use(history());
app.use('/api/WordDataList', WordDataRoutes)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});