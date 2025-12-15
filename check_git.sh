#!/bin/bash
echo "--- REMOTE ---" > git_info.txt
git remote -v >> git_info.txt
echo "--- BRANCH ---" >> git_info.txt
git branch --show-current >> git_info.txt
echo "--- STATUS ---" >> git_info.txt
git status >> git_info.txt
echo "--- LAST LOG ---" >> git_info.txt
git log -1 --oneline >> git_info.txt
