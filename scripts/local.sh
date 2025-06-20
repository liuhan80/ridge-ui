#!/bin/bash
# 获取当前脚本所在的绝对路径
script_path=$(realpath "$0")
# 获取上级目录 预构建成品包
parent_dir=$(dirname "$script_path")
PWD=$(pwd)
echo $PWD
echo "当前目录: $PWD"

rm -rf $PWD/public/npm/ridgejs
mkdir $PWD/public/npm/ridgejs
rm -rf $PWD/public/npm/ridge-editor
mkdir $PWD/public/npm/ridge-editor
npm run build --workspace=ridgejs
cp -r $PWD/core/runtime/build $PWD/public/npm/ridgejs

npm run build --workspace=ridge-editor
cp -r $PWD/core/editor/build/* $PWD/public/npm/ridge-editor
cp $PWD/core/editor/package.json $PWD/public/npm/ridge-editor

npm run build --workspace=ridge-container
npm run build --workspace=ridge-bootstrap
npm run build --workspace=ridge-semi
npm run build --workspace=ridge-highcharts
npm run build --workspace=ridge-highcharts-extra
npm run build --workspace=ridge-material
npm run build --workspace=ridge-antd
npm run build --workspace=ridge-marked
npm run build --workspace=ridge-cropperjs
npm run build --workspace=ridge-echarts
npm run build --workspace=ridge-animatecss
npm run build --workspace=ridge-toolbox
npm run build --workspace=ridge-modernize
npm run build --workspace=ridge-semantic
npm run build --workspace=ridge-music-block
npm run build --workspace=ridge-effect-animejs
npm run build --workspace=ridge-text


