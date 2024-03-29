#!/bin/bash
if [ -z "$1" ]; then
  echo "Please provide a commit message"
  exit 1
fi
if [[ `git status --porcelain` ]]; then
  echo "There are changes"
  git add .
  git commit -m "auto: $1"
else
  echo "check-git: There are no changes to commit"
  exit 0
fi