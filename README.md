# RASPBERRY

EXPRESS PORT : 5000
nodemon server.js
JSON-SERVER PORT : 3000
json-server --watch db.json

change api url to "http://localhost:3000"


# HEROKU
To make into production :
change api url to "https://data-base-mime.herokuapp.com/" in EventService.js and JoinGame1.vue

heroku config:set MONGO_URI=""
heroku config:set API_URI="https://data-base-mime.herokuapp.com"

./deploy.sh

# Run local

npm run dev

json-server --watch db.json

# For env variable 

npm i --save dotenv
create .env file
add "require('dotenv').config()" in server.js

access variable via process.env.







