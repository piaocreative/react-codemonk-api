#!/bin/bash

export  PATH="/home/ec2-user/.nvm/versions/node/v12.16.3/bin/node:$PATH"


/home/ec2-user/.nvm/versions/node/v12.16.3/bin/pm2 stop all || true


