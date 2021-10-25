#!/usr/bi/env bash

npm run build &&
cd build
echo "upload.versionlin.xyz" > CNAME
git init &&
git add . &&
git commit -m 'deploy' &&
git remote add origin git@github.com:versionlin7/picbed-website.git &&
git push -u origin master -f
