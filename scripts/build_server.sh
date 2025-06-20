#!/bin/sh  

RIDGE_SERVER_FILE_NAME=ridge-server-v1.0.0-win32-x64.zip

cd ..
rm -rf ./dist/ridge-server

cd dist
mkdir ridge-server
cd ridge-server
mkdir packages
cp -r ../../server/boot ./packages
cp -r ../../server/http ./packages
cp -r ../../server/delivery ./packages

mkdir public
cp -r ../../public ./

cp ../../server/server/* ./

echo "Module Copied"

echo "Install Node Modules..."
npm i --production
npx clean-modules -y
cd ..

rm -rf $RIDGE_SERVER_FILE_NAME
echo "zipping.... "
7z a $RIDGE_SERVER_FILE_NAME ./ridge-server/*

rm -rf ./ridge-server

echo "Build Win32 Complete"
