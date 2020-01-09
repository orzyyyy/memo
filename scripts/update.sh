#!/bin/bash

git pull --rebase
npm run clean
cnpm i
npm run build:private
npm run restart
