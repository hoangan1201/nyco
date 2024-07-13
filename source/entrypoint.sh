#!/bin/bash
cd /app/source
######### Source Environment vars from file or docker run command
mkdir /app/source/node_modules
ln -fs /save/node_modules/* /app/source/node_modules/.

npm run build-production
npm run dev
