#!/bin/bash

source /home/ec2-user/.bash_profile
export WILLSON=$HOME/deploy/willson

NODE_ENV=src

echo "delete willson project"
pm2 delete willson

echo "make bundle file"
npm run build:dev

echo "delete willson project"
pm2 start --name willson $WILLSON/config/dist/bundle.js
