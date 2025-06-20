#!/bin/bash -x

## 目标： 构建 社区版
VERSION=1.2.1


# 获取当前脚本所在目录的上级目录的绝对路径
RIDGE_ROOT=$(realpath "$(dirname "$(dirname "$0")")")
echo "make dirs: ${RIDGE_ROOT}"

COMMUNITY_SERVER_ROOT=$RIDGE_ROOT/dist/ridge-community-server
rm -rf $COMMUNITY_SERVER_ROOT
mkdir $COMMUNITY_SERVER_ROOT

echo "COMMUNITY_SERVER_ROOT: $COMMUNITY_SERVER_ROOT"
############### Community Server ####

echo "Building Community Server"

echo "Copying Files"
cp -r $RIDGE_ROOT/server/community/* $COMMUNITY_SERVER_ROOT

mkdir $COMMUNITY_SERVER_ROOT/packages
cp -r $RIDGE_ROOT/server/http $COMMUNITY_SERVER_ROOT/packages
cp -r $RIDGE_ROOT/server/boot $COMMUNITY_SERVER_ROOT/packages
cp -r $RIDGE_ROOT/server/npm-service $COMMUNITY_SERVER_ROOT/packages

cd $COMMUNITY_SERVER_ROOT

echo "Npm Install"

npm i --registry=https://registry.npmmirror.com --omit=dev

cd ..

$RIDGE_ROOT/scripts/tools/zip -r -q community.zip ./ridge-community-server
rm -rf $COMMUNITY_SERVER_ROOT

$RIDGE_ROOT/scripts/tools/unzip -q community.zip
rm -rf $COMMUNITY_SERVER_ROOT/packages

mkdir $COMMUNITY_SERVER_ROOT/public
mkdir $COMMUNITY_SERVER_ROOT/public/npm
echo "Install Complete"

community_sync_paths=(
  "ridgejs" 
  "ridge-editor" 
  "ridge-editor-app" 
  "ridge-community-website" 
  "ridge-bootstrap" 
  "ridge-container" 
  "ridge-material" 
  "ridge-semi" 
  "ridge-animatecss" 
  "animate.css" 
  "ridge-antd" 
  "ridge-toolbox" 
  "ridge-modernize" 
  "axios" 
  "react-dom@18.2.0" 
  "react@18.2.0" 
  "bootstrap" 
  "bootstrap-icons@1.11.3" 
  "bootswatch" 
  "highcharts" 
  "echarts" 
  "lodash" 
  "@mui" 
  "@douyinfe" 
  "antd@5.21.5" 
  "dayjs@1.11.13" 
  "@ant-design"
)

for i in "${community_sync_paths[@]}"
do
  echo "Syncing $RIDGE_ROOT/public/npm/$i -> $COMMUNITY_SERVER_ROOT/public/npm/$i"
  cp -r $RIDGE_ROOT/public/npm/$i $COMMUNITY_SERVER_ROOT/public/npm/$i
done


cd $COMMUNITY_SERVER_ROOT

rm -rf $RIDGE_ROOT/dist/ridge-community-$VERSION.zip

$RIDGE_ROOT/scripts/tools/zip -r -q $RIDGE_ROOT/dist/ridge-community-$VERSION.zip ./

cd ..
rm -rf $COMMUNITY_SERVER_ROOT