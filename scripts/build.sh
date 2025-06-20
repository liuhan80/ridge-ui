#!/bin/bash -x

## 目标： 构建 社区版、企业版（待开发）、云端版本， 更新云端版本
DIS_PATH=/opt/distribution
CODE_PATH=/opt/ridge
VERSION=1.2.1

echo "make dirs: ${DIS_PATH}"
rm -rf $DIS_PATH
mkdir $DIS_PATH

mkdir $DIS_PATH/server

############### Community Server ####

echo "Building Community Server"
cp -r $CODE_PATH/server/community $DIS_PATH/server/
mkdir $DIS_PATH/server/community/packages
cp -r $CODE_PATH/server/http $DIS_PATH/server/community/packages
cp -r $CODE_PATH/server/boot $DIS_PATH/server/community/packages
cp -r $CODE_PATH/server/npm-service $DIS_PATH/server/community/packages

cd $DIS_PATH/server/community
npm i --registry=https://registry.npmmirror.com --omit=dev

cd $DIS_PATH/server
zip -r -q community.zip community
rm -rf community

unzip -q community.zip
rm -rf ./community/packages
mkdir community/public
mkdir community/public/npm
echo "Community Server Ready"

############### Community Server End ##

############### Cloud Server ####

echo "Building Cloud Server"
cp -r $CODE_PATH/server/cloud $DIS_PATH/server/
mkdir $DIS_PATH/server/cloud/packages
cp -r $CODE_PATH/server/http $DIS_PATH/server/cloud/packages
cp -r $CODE_PATH/server/boot $DIS_PATH/server/cloud/packages
cp -r $CODE_PATH/server/app-storage $DIS_PATH/server/cloud/packages
cp -r $CODE_PATH/server/cache $DIS_PATH/server/cloud/packages
cp -r $CODE_PATH/server/dao $DIS_PATH/server/cloud/packages
cp -r $CODE_PATH/server/nedb $DIS_PATH/server/cloud/packages
cp -r $CODE_PATH/server/user $DIS_PATH/server/cloud/packages
cp -r $CODE_PATH/server/npm-service $DIS_PATH/server/cloud/packages

cd $DIS_PATH/server/cloud
npm i --registry=https://registry.npmmirror.com --omit=dev

echo "Cloud Server Built"

echo "Make Community Distribution"

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
  "ridge-effect-animejs" 
  "ridge-modernize" 
  "ridge-text" 
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
  echo "Syncing $CODE_PATH/public/npm/$i -> $DIS_PATH/server/community/public/npm/$i"
  cp -r $CODE_PATH/public/npm/$i $DIS_PATH/server/community/public/npm/$i
done

cd $DIS_PATH/server/community
zip -r -q /$DIS_PATH/ridge-community-$VERSION.zip ./

################## Community Ready

echo "Make Cloud Distribution"
pm2 stop all 
rm -rf /opt/cloud
cp -r $DIS_PATH/server/cloud /opt/cloud

cloud_sync_paths=(
 "ridgejs" 
 "ridge-editor" 
 "ridge-editor-app" 
 "ridge-website" 
 "ridge-common" 
 "ridge-bootstrap" 
 "ridge-container" 
 "ridge-material" 
 "ridge-semi" 
 "ridge-highcharts" 
 "ridge-highcharts-extra" 
 "ridge-echarts" 
 "ridge-antd" 
 "ridge-marked" 
 "ridge-cropperjs" 
 "ridge-admin" 
 "ridge-animatecss" 
 "ridge-modernize" 
 "ridge-effect-animejs" 
 "ridge-text" 
 "ridge-semantic" 
 "ridge-toolbox" 
 "ridge-app-weather" 
 "ridge-app-timeline" 
 "ridge-tenori-on" 
 "ridge-website" 
 "ridge-calculator" 
 "ridge-calendar" 
 "photo-china-poems" 
 "animate.css" 
 "react-dom@18.2.0" 
 "react@18.2.0" 
 "bootswatch" 
 "highcharts" 
 "echarts" 
 "animejs" 
 "lodash" 
 "@mui" 
 "@douyinfe" 
 "antd@5.21.5" 
 "dayjs@1.11.13" 
 "@ant-design"
 "axios" 
 "bootstrap" 
 "bootstrap-icons@1.11.3"
)

# 同步npm包
for i in "${cloud_sync_paths[@]}"
do
  echo "Syncing $CODE_PATH/public/npm/$i -> /opt/public/npm/$i"
  rm -rf /opt/public/npm/$i
  cp -r $CODE_PATH/public/npm/$i /opt/public/npm/$i
done

# 同步其他Public资源
# cp -r $CODE_PATH/public/* /opt/public/

cp -r $CODE_PATH/docs /opt/public/

pm2 start /opt/cloud/ecosystem.config.js
