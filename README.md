To make into production :

cd client
change api url
npm run build 

at root
git add .
git commit -am "new changes"
git push heroku master

Run local

cd client 
npm run serve 

json-server --watch db.json