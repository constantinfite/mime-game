cd C:\\Users\\const\\Documents\\Web-programming\\mime-game\\client
npm run build
cd ..
echo "Enter your message"
read message
git add .
git commit -am"${message}"
git push origin master

