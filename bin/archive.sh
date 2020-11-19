#!/bin/bash
# Create a distributable Zip archive of the plugin for upload to WP.org
#
# Usage:
# ./bin/archive.sh
#
# Prerequisites:
# - rsync
# - zip

# Include hidden files with globs
shopt -s dotglob

echo "Copying plugin files ..."
rsync -rc --exclude-from="actblue/.distignore" --delete --delete-excluded actblue/ dist/

echo "Creating zip file ..."
(cd dist && zip -r ../actblue.zip ./*)

echo "Cleaning up ..."
rm -rf dist

echo "Done!"
