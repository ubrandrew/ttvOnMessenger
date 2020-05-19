#!/bin/bash
# Building popup and merging with chrome extension 

cd ttvmotes
yarn install
yarn build 

cd ..
rm -rf MessengerMotesBuild
rm -rf MessengerMotesBuild


mkdir MessengerMotesBuild
cp -a ttvmotes/build/. MessengerMotesBuild
cp -a MessengerMotes/. MEssengerMotesBuild