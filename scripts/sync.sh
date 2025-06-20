#!/bin/bash

RIDGE_REPO=C:/Work/ridge

OPEN_REPO=C:/Work/github.io/ridge

GITHUB_IO=C:/Work/github.io/ridgeui.github.io

rm -rf $OPEN_REPO/core

mkdir $OPEN_REPO/core
cp -r $RIDGE_REPO/core/runtime $OPEN_REPO/core
cp -r $RIDGE_REPO/core/externals $OPEN_REPO/core
cp -r $RIDGE_REPO/core/tools $OPEN_REPO/core


rm -rf $OPEN_REPO/components

cp -r $RIDGE_REPO/components $OPEN_REPO

rm -rf $OPEN_REPO/docs
cp -r $RIDGE_REPO/docs $OPEN_REPO


rm -rf $GITHUB_IO/*

cp -r $RIDGE_REPO/public/npm $GITHUB_IO/
cp $RIDGE_REPO/server/cloud/index.html $GITHUB_IO/