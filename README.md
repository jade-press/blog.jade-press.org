# blog.jade-press.org
code of [blog.jade-press.org](http://blog.jade-press.org)

## run it
```bash

#for mongodb driver ubuntu (optional)
#sudo apt-get install libkrb5-dev
#or visit https://github.com/mongodb/node-mongodb-native#troubleshooting for more

#for canvas ubuntu (optional)
#sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
#visit https://www.npmjs.com/package/canvas for more platform

git clone https://github.com/jade-press/blog.jade-press.org.git
cd blog.jade-press.org
npm install
cp config-sample.js config.js

#read and edit config.js to define all the settings 

# need your mongodb ready to connect
node app

#or inproduction
# pm2 start server.json

```

then visit (by default) [http://127.0.0.1:7400](http://127.0.0.1:7400)


