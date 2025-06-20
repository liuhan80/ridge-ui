#!/bin/bash -x

git reset --hard HEAD && git pull

chmod +x ./scripts/build.sh

./scripts/build.sh