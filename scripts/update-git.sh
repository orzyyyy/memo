#!/bin/bash

git checkout .
git pull --rebase
git checkout .
git pull --rebase
npm run build:private
npm run compile:server
npm run restart
