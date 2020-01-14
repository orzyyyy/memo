#!/bin/bash

git checkout .
git pull --rebase
git checkout .
git pull --rebase
npm run clean
npm i
npm run build:private
npm run restart
