#!/bin/bash
if [ -z "$1" ]; then
  echo "Please provide a commit message"
  exit 1
fi

# Check if on "main" branch
if [[ $(git rev-parse --abbrev-ref HEAD) != "main" ]]; then
  current_branch=$(git rev-parse --abbrev-ref HEAD)
  echo -e "\033[31mYou can release a new version only from the 'main' branch."
  echo -e "\033[0mCurrent branch: $current_branch"
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