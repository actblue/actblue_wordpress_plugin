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

# Import GPG private key path and username from environment
GPG_UID=${GPG_UID:-test@example.com}
GPG_PRIVATE_KEYPATH=${GPG_PRIVATE_KEYPATH:-signing.key}

echo "Creating artifcats directory ..."
rm -rf artifacts && mkdir artifacts

echo "Copying plugin files ..."
rsync -rc --exclude-from="actblue-contributions/.distignore" --delete --delete-excluded actblue-contributions/ dist/

echo "Creating zip file ..."
(cd dist && zip -r ../artifacts/actblue-contributions.zip ./*)

echo "Import GPG signing key ..."
gpg --import "$GPG_PRIVATE_KEYPATH"

echo "Signing zip file ..."
gpg -u "$GPG_UID" --detach-sign --output artifacts/actblue-contributions.zip.asc artifacts/actblue-contributions.zip

echo "Cleaning up ..."
rm -rf dist

echo "Done!"
