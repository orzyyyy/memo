#!/bin/bash

git pull --rebase
npm run clean
cnpm ci
npm run build:private
