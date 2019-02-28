#!/bin/bash

tsc --watch &
npm run dev &
npm run server &
wait