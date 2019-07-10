#!/bin/bash

source /home/ec2-user/.bash_profile
export WILLSON=$HOME/deploy/willson

NODE_ENV=src

pm2 delete willson
yarn build:dev
pm2 start --name willson $WILLSON/config/dist/bundle.js

