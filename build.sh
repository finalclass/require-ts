#!/bin/bash

rm build -rf
cd src
echo "--module commonjs --outDir ./build --target ES5" > build.txt

ls -R . | awk '/:$/&&f{s=$0;f=0}/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}NF&&f{ print s"/"$0 }' | grep ".ts" >> build.txt 
tsc @build.txt
rm build.txt
mv build ../build
cd ..
