#!/bin/bash

source /home/ec2-user/.bash_profile

NODE_ENV=src
pm2 start /home/ec2-user/deploy/willson/config/dist/bundle.js