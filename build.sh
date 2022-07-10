#!/bin/bash

commit_log=`date`

if [ ! -n $1 ];then
  commit_log=$1
fi

git add .
git commit -m "$commit_log"
git push origin master
echo "部署成功"
