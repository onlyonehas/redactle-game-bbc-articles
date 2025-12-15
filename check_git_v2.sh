#!/bin/bash
TARGET="/Users/abbash04/sites/redactle-for-bbc/git_result.txt"
cd /Users/abbash04/sites/redactle-for-bbc
echo "--- REMOTE ---" > "$TARGET"
/usr/bin/git remote -v >> "$TARGET"
echo "--- BRANCH ---" >> "$TARGET"
/usr/bin/git branch --show-current >> "$TARGET"
echo "--- STATUS ---" >> "$TARGET"
/usr/bin/git status >> "$TARGET"
