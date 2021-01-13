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

echo "Creating artifcats directory ..."
rm -rf artifacts && mkdir artifacts

echo "Copying plugin files ..."
rsync -rc --exclude-from="actblue-contributions/.distignore" --delete --delete-excluded actblue-contributions/ dist/

echo "Creating zip file ..."
(cd dist && zip -r ../artifacts/actblue-contributions.zip ./*)

echo "Import GPG signing key ..."
echo -e "$GPG_PRIVATE_KEY" | gpg --import

echo "Signing zip file ..."
gpg -u "$GPG_UID" --detach-sign --output artifacts/actblue-contributions.zip.asc artifacts/actblue-contributions.zip

echo "Cleaning up ..."
rm -rf dist

echo "Done!"
