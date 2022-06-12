#!/bin/bash

cd /home/ec2-user/api
if [ "$DEPLOYMENT_GROUP_NAME" == "group-dev-codemonk-node-app" ]; then
  ###Copying env file####
  aws s3 cp s3://codemonk-dev-node-apps-releases/config/development.env /home/ec2-user/api
  NODE_ENV=development node_modules/migrate-mongo/bin/migrate-mongo.js up
  sudo npm install puppeteer --unsafe-perm=true --allow-root
  sudo node node_modules/puppeteer/install.js
  sudo yum install alsa-lib.x86_64 atk.x86_64 cups-libs.x86_64 gtk3.x86_64 ipa-gothic-fonts libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXrandr.x86_64 libXScrnSaver.x86_64 libXtst.x86_64 pango.x86_64 xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-fonts-cyrillic xorg-x11-fonts-misc xorg-x11-fonts-Type1 xorg-x11-utils
  sudo pm2 start develop.json
elif [ "$DEPLOYMENT_GROUP_NAME" == "group-stage-codemonk-node-app" ]; then
  ###Copying env file####
  aws s3 cp s3://codemonk-stage-node-apps-releases/config/staging.env /home/ec2-user/api
  NODE_ENV=staging node_modules/migrate-mongo/bin/migrate-mongo.js up
  sudo npm install puppeteer --unsafe-perm=true --allow-root
  sudo node node_modules/puppeteer/install.js
  sudo yum install alsa-lib.x86_64 atk.x86_64 cups-libs.x86_64 gtk3.x86_64 ipa-gothic-fonts libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXrandr.x86_64 libXScrnSaver.x86_64 libXtst.x86_64 pango.x86_64 xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-fonts-cyrillic xorg-x11-fonts-misc xorg-x11-fonts-Type1 xorg-x11-utils
  sudo pm2 start staging.json
elif [ "$DEPLOYMENT_GROUP_NAME" == "group-prod-codemonk-node-app" ]; then
  ###Copying env file####
  cd /home/ec2-user/api
  aws s3 cp s3://codemonk-prod-node-apps-releases/config/production.env /home/ec2-user/api
  NODE_ENV=production node_modules/migrate-mongo/bin/migrate-mongo.js up
  sudo pm2 start prod.json
else
  echo "Deployment failed"
fi
